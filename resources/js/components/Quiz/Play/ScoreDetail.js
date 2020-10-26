import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LikeControls from "../../DisplayComponents/LikeControls";

const ScoreDetail = ({ quiz, score, onReplay, onLikesUpdated }) => {

    function getScoreText(score, percent) {
        if (percent == 100) return `Perfect score you got ${score}!`;

        if (percent >= 80) return `Excellent score you got ${score}!`;

        if (percent >= 50) return `Well done you got ${score}!`;

        if (percent >= 30) return `Better luck next time you got ${score}!`;

        if (percent > 0) return `More work needed you got ${score}!`;

        return `What was that? You got ${score}!`;

    }

    return (
        <div className="mt-6">
            <h1 className="font-bold text-4xl mb-4 text-center">{quiz.title}</h1>
            <LikeControls quiz={quiz} onLikesUpdated={onLikesUpdated} />
            <   h1 className="font-bold text-2xl my-4 text-center">{getScoreText(score.score, score.score_percent)}</h1>
            <h1 className="font-bold text-2xl mb-4 text-center">Percentage: {score.score_percent}%</h1>
            <div className="flex justify-center my-4">
                <button
                    onClick={onReplay}
                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 ml-4 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="ml-1">Replay</span>
                </button>
                <Link
                    to={`/quiz/${score.quiz_id}`}
                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 ml-4"
                >
                    Leaderboard
                </Link>
            </div>
        </div>
    );
};

ScoreDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
    onReplay: PropTypes.func.isRequired,
    onLikesUpdated: PropTypes.func.isRequired

};

export default ScoreDetail;
