import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ScoreDetail = ({score, onReplay }) => {
    return (
        <div className="mt-6">
           <h1 className="font-bold text-2xl mb-4 text-center">You scored: {score.score}</h1>
           <h1 className="font-bold text-2xl mb-4 text-center">Percentage: {score.score_percent}%</h1>
           <div className="flex justify-center my-4">
                <button
                    onClick={onReplay}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4"
                >
                  Replay
                </button>
                <Link
                    to={`/quiz/${score.quiz_id}`}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4"
                >
                  Go back to detail page
                </Link>
            </div>
        </div>
    );
};

ScoreDetail.propTypes = {
    score: PropTypes.object.isRequired,
    onReplay: PropTypes.func.isRequired
};

export default ScoreDetail;
