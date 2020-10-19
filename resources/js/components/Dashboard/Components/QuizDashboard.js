import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getQuizzesByUser } from "../../../api/quizApi";
import { toast } from "react-toastify";

const QuizDashboard = ({ user }) => {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(() => {
        if(!quizzes) {
            getQuizzesByUser(user.profile.id).then(quizzesData => {
                console.log(quizzesData);
                setQuizzes(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzes])

    return (
        <div className="quiz-dashboard">
            {quizzes == null ? (
                <p>...Loading quiz dashboard</p>
            ) : (
            <div>
                {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-5 px-4 py-2 border-b overflow-hidden">
                        <div>
                            <p className="text-small text-gray-600">Name:</p>
                            <h3 className="font-bold text-lg items-center">{quiz.title}</h3>
                        </div>
                        <div>
                            <p className="text-small text-gray-600">Total Questions:</p>
                            <p>{quiz.questionsCount} questions</p>
                        </div>
                        <div>
                            <p className="text-small text-gray-600">Plays:</p>
                            <p>{quiz.totalPlays}</p>
                        </div>
                        <div>
                            <p className="text-small text-gray-600">Likes:</p>
                            <p>120</p>
                        </div>
                        <div>
                            <p className="text-small text-gray-600">Actions:</p>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Play
                            </Link>
                            <span> | </span>
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Details
                            </Link>
                            <span> | </span>
                            <Link
                                to={`/quiz/${quiz.id}/edit`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Edit
                            </Link>
                            <span> | </span>
                            <Link
                                to={'/'}
                                className="text-center hover:text-red-500 hover:underline"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                )
            })}
            </div>
            )}
        </div>
    );
};

QuizDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default QuizDashboard;
