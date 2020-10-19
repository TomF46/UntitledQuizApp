import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { unzip } from "lodash";

const QuizList = ({ quizzes }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg card mb-4">
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-5 p-4 border-b overflow-hidden flex justify-between items-center">
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
                        <div className="flex justify-center mb-2">
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 inline-block align-middle"
                            >
                                Details
                            </Link>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-2 inline-block align-middle"
                            >
                                Play
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
