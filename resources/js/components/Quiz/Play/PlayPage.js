import React, { useCallback, useEffect, useState } from 'react';
import { getQuiz, submitScore } from '../../../api/quizApi';
import { getChallenge } from '../../../api/challengesApi';
import QuizPlayForm from './QuizPlayForm';
import ScoreDetail from './ScoreDetail';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import { Prompt, useParams, useHistory } from 'react-router-dom';

const QuizPlayPage = () => {
  const { quizId } = useParams();
  const { challengeId } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [score, setScore] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentQuestionNumber, setcurrentQuestionNumber] = useState(1);

  const checkUserCanAccess = useCallback(
    (challengeData) => {
      if (!challengeData.userCanAttempt) {
        toast.error('User does not have permission to attempt this challenge', {
          autoClose: false,
        });
        history.push('/challenges');
      }
    },
    [history],
  );

  useEffect(() => {
    getQuiz(quizId)
      .then((quizData) => {
        setQuiz(quizData);
        createBlankSubmission(quizData);
      })
      .catch((error) => {
        toast.error(`Error getting quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }, [quizId]);

  useEffect(() => {
    if (challengeId) {
      getChallenge(challengeId)
        .then((challengeData) => {
          setChallenge(challengeData);
          checkUserCanAccess(challengeData);
        })
        .catch((error) => {
          toast.error(`Error getting challenge data ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [challengeId, checkUserCanAccess]);

  function createBlankSubmission(quizData) {
    let submission = {
      answers: [],
    };

    quizData.questions.forEach((question) => {
      submission.answers.push({
        question_id: question.id,
        answer_id: null,
      });
    });

    setSubmission({ ...submission });
  }

  function handleAnswerChange(questionId, answerId) {
    let answer = submission.answers.find(
      (answer) => answer.question_id == questionId,
    );
    answer.answer_id = answerId;
    setSubmission({ ...submission });
    if (currentQuestionNumber < quiz.questions.length) handleNext();
  }

  function submissionIsValid() {
    const errors = {};

    var emptyAnswers = submission.answers.filter(
      (answer) => answer.answer_id == null,
    );
    if (emptyAnswers.length > 0)
      errors.incomplete =
        'Submission is incomplete not all questions have an answer set.';
    if (submission.answers.length != quiz.questions.length)
      errors.onSubmit = 'Error collating quiz submission.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    confirmAlert({
      title: 'Confirm submit',
      message: `Are you sure you're ready to submit?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            submit();
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function submit() {
    if (!submissionIsValid()) return;

    if (challenge) {
      submission.challengeId = challenge.id;
      setSubmission({ ...submission });
    }

    submitScore(quiz.id, submission)
      .then((response) => {
        setScore({ ...response });
      })
      .catch((error) => {
        toast.error(`Unable to submit ${error.message}`, {
          autoClose: false,
        });
        setErrors({ onSubmit: error.message });
      });
  }

  function handleReplay() {
    createBlankSubmission(quiz);
    setScore(null);
    setcurrentQuestionNumber(1);
  }

  function handleNext() {
    let nextQuestionNumber = currentQuestionNumber + 1;
    setcurrentQuestionNumber(nextQuestionNumber);
  }

  function handlePrevious() {
    let previousQuestionNumber = currentQuestionNumber - 1;
    setcurrentQuestionNumber(previousQuestionNumber);
  }

  function handleLikesUpdated() {
    getQuiz(quizId)
      .then((quizData) => {
        setQuiz(quizData);
      })
      .catch((error) => {
        toast.error(`Error getting quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return !submission ? (
    <div className='overflow-hidden shadow page container mx-auto'>
      <LoadingMessage message={'Loading quiz'} />
    </div>
  ) : !score ? (
    <>
      <Prompt message='Are you sure you want to leave? All quiz progress will be lost.' />
      <QuizPlayForm
        quiz={quiz}
        submission={submission}
        challenge={challenge}
        onAnswerChange={handleAnswerChange}
        onSubmit={handleSubmit}
        onReset={handleReplay}
        currentQuestionNumber={currentQuestionNumber}
        onNext={handleNext}
        onPrevious={handlePrevious}
        errors={errors}
      />
    </>
  ) : (
    <ScoreDetail
      quiz={quiz}
      score={score}
      onReplay={handleReplay}
      onLikesUpdated={handleLikesUpdated}
      challenge={challenge}
    />
  );
};

export default QuizPlayPage;
