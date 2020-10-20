import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, submitScore } from "../../../api/quizApi";
import QuizPlayForm from "./QuizPlayForm";
import ScoreDetail from "./ScoreDetail";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const QuizPlayPage = ({quizId ,history }) => {
    const [quiz, setQuiz] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [score, setScore] = useState(null)
    const [errors, setErrors] = useState({});
    const [currentQuestionNumber, setcurrentQuestionNumber] = useState(1);



    useEffect(() => {
        if(!quiz) {
            getQuiz(quizId).then(quizData => {
                setQuiz(quizData);
                createBlankSubmission(quizData);
            }).catch(error => {
                console.log("Error getting quiz " + error);
                toast.error("Error getting quiz " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizId, quiz])

    function createBlankSubmission(quizData){
        let submission = {
            questions: []
        }

        quizData.questions.forEach(question => {
            submission.questions.push({
                id: question.id,
                answer_id: null
            });
        });

        setSubmission({ ...submission});
    }

    function handleAnswerChange(questionId, answerId, e){
        let question = submission.questions.find(question => question.id == questionId);
        question.answer_id = answerId;
        setSubmission({ ...submission});
    
    }

    function submissionIsValid() {
        const errors = {};

        var emptyAnswers = submission.questions.filter(question => question.answer_id == null);
        if(emptyAnswers.length > 0) errors.incomplete = "Submission is incomplete not all questions have an answer set."
        if(submission.questions.length != quiz.questions.length) errors.onSubmit = "Error collating quiz submission."

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(){
        confirmAlert({
            title: "Confirm submit",
            message: `Are you sure you're ready want to submit?`,
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                    submit();
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
          });
    }

    function submit(){
        if (!submissionIsValid()) return;

        submitScore(quiz.id, submission).then(response => {
            setScore({ ...response});
        }).catch(error => {
            console.log("Unable to submit " + error);
            toast.error("Unable to submit " + error.message,{
                autoClose: false,
            });
            setErrors({ onSubmit: error.message });
        })
    }

    function handleReplay(){
        createBlankSubmission(quiz);
        setScore(null);
    }

    function handleNext(){
        let nextQuestionNumber = currentQuestionNumber + 1;
        setcurrentQuestionNumber(nextQuestionNumber);
    }

    function handlePrevious(){
        let previousQuestionNumber = currentQuestionNumber - 1;
        setcurrentQuestionNumber(previousQuestionNumber);
    }

    return !submission ? (
        <p className="pt-6 overflow-hidden shadow-lg page">... Loading quiz</p>
    ) : (
        !score ? (
            <div className="pt-6 overflow-hidden shadow-lg page">
                <QuizPlayForm quiz={quiz} submission={submission} onAnswerChange={handleAnswerChange} onSubmit={handleSubmit} onReset={handleReplay} currentQuestionNumber={currentQuestionNumber} onNext={handleNext} onPrevious={handlePrevious} errors={errors}/>
            </div>
        ) : (
            <div className="pt-6 overflow-hidden shadow-lg page">
                <ScoreDetail score={score} onReplay={handleReplay}/>
            </div>
        )
    )
};

const mapStateToProps = (state, ownProps) => {
    const quizId = ownProps.match.params.quizId;
    return {
      quizId
    };
  };

QuizPlayPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPlayPage);

