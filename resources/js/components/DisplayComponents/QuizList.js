import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz) => {
                return (
                    <div key={quiz.id} className="p-4 rounded overflow-hidden shadow-lg mb-6">
                        <h3 className="font-bold text-lg">{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <div className="flex mb-2">
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="bg-blue-800 text-white rounded py-2 px-4 hover:bg-blue-500"
                            >
                                Details
                            </Link>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="bg-blue-800 text-white rounded py-2 px-4 hover:bg-blue-500 ml-2"
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
