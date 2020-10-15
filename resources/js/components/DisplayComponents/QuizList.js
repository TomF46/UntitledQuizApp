import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="p-4 rounded overflow-hidden shadow-lg card mb-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg items-center">{quiz.title}</h3>
                            <p>{quiz.description}</p>
                        </div>
                        <div className="flex justify-right mb-2">
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
