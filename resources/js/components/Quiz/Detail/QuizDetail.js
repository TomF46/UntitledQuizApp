import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScoresTable from "../../DisplayComponents/ScoresTable";

const QuizDetail = ({ quiz, scores }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-2xl mb-4 text-center">{quiz.title}</h1>
            <p className="text-center">{quiz.description}</p>
            <div className="flex justify-center my-4">
                <Link
                    to={`/quiz/${quiz.id}/play`}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4"
                >
                    Play
                </Link>
            </div>
            <div>
                <h2 className="font-bold text-2xl mb-4 text-center">Scores</h2>
                <ScoresTable scores={scores} />
            </div>
        </div>
    );
};

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    scores: PropTypes.array.isRequired
};

export default QuizDetail;
