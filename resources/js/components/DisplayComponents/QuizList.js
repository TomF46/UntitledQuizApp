import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link className="font-medium items-center pointer" to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
                        </div>
                        <div className="hidden lg:block col-span-2">
                            <p className="text-sm text-gray-600">Total Questions:</p>
                            <p>{quiz.questionsCount} questions</p>
                        </div>
                        <div className="hidden lg:block  col-span-1">
                            <p className="text-sm text-gray-600">Plays:</p>
                            <p>{quiz.totalPlays}</p>
                        </div>
                        <div className="hidden lg:inline-flex col-span-1 items-center">
                            <svg className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <p className="ml-1">{quiz.totalLikes}</p>
                        </div>
                        <div className="hidden lg:inline-flex col-span-1 items-center">
                            <svg className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            <p className="ml-1">{quiz.totalDislikes}</p>
                        </div>
                        <div className="col-span-6 lg:col-span-3 flex justify-end mb-2">
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 inline-block align-middle shadow"
                            >
                                Details
                            </Link>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 ml-2 shadow inline-flex items-center"
                            >
                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="ml-1">Play</p>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

QuizList.propTypes = {
    quizzes: PropTypes.array.isRequired,
};

export default QuizList;
