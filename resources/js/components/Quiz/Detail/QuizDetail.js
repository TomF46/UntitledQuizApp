import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizDetail = ({ quiz, scores }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-2xl mb-4 text-center">{quiz.title}</h1>
            <p className="text-center">{quiz.description}</p>
            <div className="flex justify-center my-4">
                <Link
                    to={`/quiz/${quiz.id}/play`}
                    className="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500 ml-4"
                >
                    Play
                </Link>
            </div>
        </div>
    );
};

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    scores: PropTypes.object.isRequired
};

export default QuizDetail;
