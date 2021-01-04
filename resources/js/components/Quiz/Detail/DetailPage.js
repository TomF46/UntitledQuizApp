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

    function handleQuizReload() {
        getQuizData();
    }


    return (
        <>
            {!quiz ? (
                <LoadingMessage message={"Loading quiz"} />
            ) : (
                    <>
                        <QuizDetail quiz={quiz} scoresPaginator={scoresPaginator} onScoresPageChange={getScoresPage} onQuizReload={handleQuizReload} isCreator={quiz.creator.id == currentUser} onDelete={handleDeleteQuiz} />
                    </>
                )}
        </>
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

