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
                <div className="flex justify-center">
            <table className="table-auto">
                <thead>
                    <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                {quizzes.map((quiz, index) => {
                    return (
                        <tr key={quiz.index}>
                        <td className="border px-4 py-2">{quiz.title}</td>
                        <td className="border px-4 py-2">{quiz.description}</td>
                        <td className="border px-4 py-2">
                            <button
                                type="button"
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                            >
                                Edit
                            </button>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                type="button"
                                
                                className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
        </div>
            </div>
            )}
        </div>
    );
};

QuizDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default QuizDashboard;
