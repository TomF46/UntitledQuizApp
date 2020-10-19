import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, getScoresForQuiz } from "../../../api/quizApi";
import QuizDetail from "./QuizDetail";
import * as QuizApi from '../../../api/quizApi';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const QuizDetailPage = ({quizId, currentUser ,history }) => {
    const [quiz, setQuiz] = useState(null);
    const [scores, setScores] = useState([]);


    useEffect(() => {
        if(!quiz) {
            getQuiz(quizId).then(quizData => {
                console.log(quizData);
                setQuiz(quizData);
                getScores(quizData.id);
            }).catch(error => {
                console.log("Error getting quiz " + error);
                toast.error("Error getting quiz " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizId, quiz])

    function getScores(id){
        getScoresForQuiz(id).then(scores => {
            setScores(scores);
        }).catch(error => {
            console.log("Error getting scores " + error);
            toast.error("Error getting scores " + error.message,{
                autoClose: false,
            });
        });
    }

    function handleDeleteQuiz(){
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
                onClick: () => {},
              },
            ],
          });
    }

    function deleteQuiz(){
        QuizApi.deleteQuiz(quiz.id).then(response => {
            toast.success("Quiz deleted.")
            history.push('/explore');
        }).catch(error => {
            console.log(error);
            toast.error("Unable to delete quiz " + error.message,{
                autoClose: false,
            });
        })
    }
    

    return !quiz ? (
        <p className="pt-6 overflow-hidden shadow-lg page">... Loading quiz</p>
    ) : (
        <div className="pt-6 overflow-hidden shadow-lg page">
            <QuizDetail quiz={quiz} scores={scores} />
            {quiz.creator_id == currentUser && (
                <div className="p-4 mt-4 flex justify-between items-center border-t">
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => history.push(`/quiz/${quiz.id}/edit`)}
                            className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="flex justify-right">
                        <button
                            type="button"
                            onClick={handleDeleteQuiz}
                            className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow"
                        >
                            Delete
                        </button>
                    </div>
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
    const quizId = ownProps.match.params.quizId;
    const currentUser = state.tokens.user_id;

    return {
      quizId,
      currentUser
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetailPage);

