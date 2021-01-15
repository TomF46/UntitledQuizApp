import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, submitScore } from "../../../api/quizApi";
import { getChallenge } from "../../../api/challengesApi";
import QuizPlayForm from "./QuizPlayForm";
import ScoreDetail from "./ScoreDetail";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import ChallengeInfoPanel from "./ChallegeInfoPanel";

const QuizPlayPage = ({ quizId, challengeId, history }) => {
    const [quiz, setQuiz] = useState(null);
    const [challenge, setChallenge] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [score, setScore] = useState(null)
    const [errors, setErrors] = useState({});
    const [currentQuestionNumber, setcurrentQuestionNumber] = useState(1);



    useEffect(() => {
        if (!quiz) {
            getQuiz(quizId).then(quizData => {
                setQuiz(quizData);
                createBlankSubmission(quizData);
            }).catch(error => {
                toast.error("Error getting quiz " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [quizId, quiz])

    useEffect(() => {
        if (!challenge && challengeId) {
            getChallenge(challengeId).then(challengeData => {
                setChallenge(challengeData)
                checkUserCanAccess(challengeData);
            }).catch(error => {
                toast.error("Error getting challenge data " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [challengeId])

    function checkUserCanAccess(challengeData) {
        if (!challengeData.userCanAttempt) {
            toast.error("User does not have permission to attempt this challenge", {
                autoClose: false,
            });
            history.push("/challenges");
        }
    }

    function createBlankSubmission(quizData) {
        let submission = {
            questions: []
        }

        quizData.questions.forEach(question => {
            submission.questions.push({
                id: question.id,
                answer_id: null
            });
        });

        setSubmission({ ...submission });
    }

    function handleAnswerChange(questionId, answerId, e) {
        let question = submission.questions.find(question => question.id == questionId);
        question.answer_id = answerId;
        setSubmission({ ...submission });
        if (currentQuestionNumber < quiz.questions.length) handleNext();
    }

    function submissionIsValid() {
        const errors = {};

        var emptyAnswers = submission.questions.filter(question => question.answer_id == null);
        if (emptyAnswers.length > 0) errors.incomplete = "Submission is incomplete not all questions have an answer set."
        if (submission.questions.length != quiz.questions.length) errors.onSubmit = "Error collating quiz submission."

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit() {
        confirmAlert({
            title: "Confirm submit",
            message: `Are you sure you're ready to submit?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        submit();
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
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

        submitScore(quiz.id, submission).then(response => {
            setScore({ ...response });
        }).catch(error => {
            toast.error("Unable to submit " + error.message, {
                autoClose: false,
            });
            setErrors({ onSubmit: error.message });
        })
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
        getQuiz(quizId).then(quizData => {
            setQuiz(quizData);
        }).catch(error => {
            toast.error("Error getting quiz " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="overflow-hidden shadow-lg page">
            {!submission ? (
                <LoadingMessage message={'Loading quiz'} />
            ) : (
                    !score ? (
                        <div>
                            {challenge && (
                                <ChallengeInfoPanel challenge={challenge} />
                            )}
                            <QuizPlayForm quiz={quiz} submission={submission} onAnswerChange={handleAnswerChange} onSubmit={handleSubmit} onReset={handleReplay} currentQuestionNumber={currentQuestionNumber} onNext={handleNext} onPrevious={handlePrevious} errors={errors} />
                        </div>
                    ) : (
                            <div>
                                <ScoreDetail quiz={quiz} score={score} onReplay={handleReplay} onLikesUpdated={handleLikesUpdated} challenge={challenge} />
                            </div>
                        ))}
        </div>
    )
};

QuizPlayPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    challengeId: PropTypes.any,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        quizId: ownProps.match.params.quizId,
        challengeId: ownProps.match.params.challengeId
    };
};


export default connect(mapStateToProps)(QuizPlayPage);

