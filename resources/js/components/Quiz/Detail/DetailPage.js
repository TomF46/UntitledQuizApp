import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, getScoresForQuiz } from "../../../api/quizApi";
import QuizDetail from "./QuizDetail";
import * as QuizApi from '../../../api/quizApi';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { getScoresWithPaginator } from "../../../api/userApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const QuizDetailPage = ({ quizId, currentUser, history }) => {
    const [quiz, setQuiz] = useState(null);
    const [scoresPaginator, setScores] = useState(null);


    useEffect(() => {
        if (!quiz) {
            getQuizData();
        }
    }, [quizId, quiz])

    function getQuizData() {
        getQuiz(quizId).then(quizData => {
            setQuiz(quizData);
            getScores(quizData.id);
        }).catch(error => {
            toast.error("Error getting quiz " + error.message, {
                autoClose: false,
            });
        });
    }

    function getScores(id) {
        getScoresForQuiz(id).then(scores => {
            setScores(scores);
        }).catch(error => {
            toast.error("Error getting scores " + error.message, {
                autoClose: false,
            });
        });
    }

    function getScoresPage(url) {
        getScoresWithPaginator(url).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            toast.error("Error getting user scores " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleDeleteQuiz() {
        confirmAlert({
            title: "Confirm deletion",
            message: `Are you sure you want to delete ${quiz.title}?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteQuiz(),
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function deleteQuiz() {
        QuizApi.deleteQuiz(quiz.id).then(response => {
            toast.success("Quiz deleted.")
            history.push('/explore');
        }).catch(error => {
            toast.error("Unable to delete quiz " + error.message, {
                autoClose: false,
            });
        })
    }

    function like() {
        if (quiz.likedByUser) {
            removeLikeOrDislike();
            return;
        }

        QuizApi.likeQuiz(quiz.id).then(() => {
            toast.success("Quiz Liked.")
            getQuizData();
        }).catch(error => {
            toast.error("Unable to like quiz " + error.message, {
                autoClose: false,
            });
        })
    }

    function dislike() {
        if (quiz.dislikedByUser) {
            removeLikeOrDislike();
            return;
        }
        QuizApi.dislikeQuiz(quiz.id).then(() => {
            toast.success("Quiz disliked.")
            getQuizData();
        }).catch(error => {
            toast.error("Unable to dislike quiz " + error.message, {
                autoClose: false,
            });
        })
    }

    function removeLikeOrDislike() {
        QuizApi.removeLikeOrDislike(quiz.id).then(() => {
            getQuizData();
        }).catch(error => {
            toast.error("Error performing action " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="pt-6 overflow-hidden shadow-lg page">
            {!quiz ? (
                <LoadingMessage message={"Loading quiz"} />
            ) : (
                    <div>
                        <QuizDetail quiz={quiz} scoresPaginator={scoresPaginator} onScoresPageChange={getScoresPage} onLike={like} onDislike={dislike} />
                        {quiz.creator_id == currentUser && (
                            <div className="p-4 mt-4 flex justify-between items-center border-t">
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={() => history.push(`/quiz/${quiz.id}/edit`)}
                                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow inline-flex items-center"
                                    >
                                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span className="ml-1">Edit Quiz</span>
                                    </button>
                                </div>
                                <div className="flex justify-right">
                                    <button
                                        type="button"
                                        onClick={handleDeleteQuiz}
                                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                                    >
                                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="ml-1">Delete</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
        </div>
    )
};

QuizDetailPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        quizId: ownProps.match.params.quizId,
        currentUser: state.tokens.user_id
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetailPage);

