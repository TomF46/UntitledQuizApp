import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { unzip } from "lodash";

const QuizList = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-12 px-4 py-2 border-b overflow-hidden">
                        <div className="col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <h3 className="font-bold text-lg items-center">{quiz.title}</h3>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Total Questions:</p>
                            <p>{quiz.questionsCount} questions</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-sm text-gray-600">Plays:</p>
                            <p>{quiz.totalPlays}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-sm text-gray-600">Likes:</p>
                            <p>120</p>
                        </div>
                        <div className="col-span-4 flex justify-center mb-2">
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 inline-block align-middle shadow"
                            >
                                Details
                            </Link>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-2 inline-block align-middle shadow"
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
