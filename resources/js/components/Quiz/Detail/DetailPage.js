import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, getScoresForQuiz, getUsersHighScoreForQuiz, unban, deleteQuiz, toggleRecommended } from "../../../api/quizApi";
import QuizDetail from "./QuizDetail";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { getScoresWithPaginator } from "../../../api/userApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import _ from 'lodash';


const QuizDetailPage = ({ quizId, currentUser, isAdmin, history }) => {
    const [quiz, setQuiz] = useState(null);
    const [highScore, setHighScore] = useState(null);
    const [scoresPaginator, setScores] = useState(null);


    useEffect(() => {
        if (!quiz) {
            getQuizData();
        }
    }, [quizId, quiz])

    function getQuizData() {
        getQuiz(quizId).then(quizData => {
            setQuiz(quizData);
            if (!quizData.isBanned) {
                getHighScores(quizData.id);
                getScores(quizData.id);
            }
        }).catch(error => {
            toast.error(`Error getting quiz ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getHighScores(id) {
        getUsersHighScoreForQuiz(id).then(highScoreData => {
            setHighScore(highScoreData);
        }).catch(error => {
            toast.error(`Error getting high score ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getScores(id) {
        getScoresForQuiz(id).then(scores => {
            setScores(scores);
        }).catch(error => {
            toast.error(`Error getting scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getScoresPage(url) {
        getScoresWithPaginator(url).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            toast.error(`Error getting user scores ${error.message}`, {
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
                    onClick: () => handleDelete(),
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function handleDelete() {
        deleteQuiz(quiz.id).then(response => {
            toast.success("Quiz deleted.")
            history.push('/explore');
        }).catch(error => {
            toast.error(`Unable to delete quiz ${error.message}`, {
                autoClose: false,
            });
        })
    }

    function handleQuizReload() {
        getQuizData();
    }

    function handleToggleBan() {
        if (!quiz.isBanned) {
            history.push(`/admin/quiz/${quiz.id}/ban`)
            return;
        }

        unbanQuiz();
    }

    function unbanQuiz() {
        unban(quiz.id).then(res => {
            toast.success("Quiz unbanned")
            handleQuizReload();
        }).catch(error => {
            toast.error(`Error unbanning quiz ${error.message}`, {
                autoClose: false,
            });
        })
    }

    function handleToggleRecommended() {
        toggleRecommended(quiz.id).then(res => {
            toast.success(`${quiz.recommended ? "Recommendation removed" : "Recommendation added"}`)
            handleQuizReload();
        }).catch(error => {
            toast.error(`Error ${quiz.recommended ? "removing recommendation" : "recommending"} quiz ${error.message}`, {
                autoClose: false,
            });
        })
    }

    return (
        <>
            {!quiz ? (
                <LoadingMessage message={"Loading quiz"} />
            ) : (
                <>
                    <QuizDetail quiz={quiz} scoresPaginator={scoresPaginator} onScoresPageChange={getScoresPage} onQuizReload={handleQuizReload} isCreator={quiz.creator.id == currentUser} onDelete={handleDeleteQuiz} userHighScore={highScore} isAdmin={isAdmin} onQuizToggleBan={handleToggleBan} onToggleRecommended={handleToggleRecommended} />
                </>
            )}
        </>
    )
};

QuizDetailPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        quizId: ownProps.match.params.quizId,
        currentUser: state.tokens.user_id,
        isAdmin: state.isAdmin
    };
};


export default connect(mapStateToProps)(QuizDetailPage);

