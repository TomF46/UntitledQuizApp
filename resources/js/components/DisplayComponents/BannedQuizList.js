import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannedQuizList = ({ quizzes, onQuizUnban }) => {
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 md:col-span-5 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link className="font-medium items-center pointer" to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
                        </div>
                        <div className="hidden lg:block col-span-5">
                            <p className="text-sm text-gray-600">Reason:</p>
                            <p>{quiz.reason}</p>
                        </div>
                        <div className="col-span-6 md:col-span-5 lg:col-span-3 flex justify-end mb-2">
                            <button
                                type="button"
                                onClick={() => onQuizUnban(quiz.id)}
                                className="border border-red-400 text-red-400 text-center rounded py-2 px-4 mt-4 hover:bg-red-600 hover:text-white shadow inline-flex items-center justify-center"
                            >
                                <svg className="text-red-400 hover:text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="ml-1">Unban</span>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

BannedQuizList.propTypes = {
    quizzes: PropTypes.array.isRequired,
    onQuizUnban: PropTypes.func.isRequired
};

export default BannedQuizList;
