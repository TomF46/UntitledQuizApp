import React from "react";
import PropTypes from "prop-types";

const ChallengeScoresTable = ({ scores, onScoreSelected }) => {
    return scores.length > 0 ? (
        <div className="flex justify-center">
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Quiz</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Score %</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => {
                        return (
                            <tr className="border-t border-gray-200 text-center" key={score.id}>
                                <td className="px-4 py-2">{score.quiz_name}</td>
                                <td className="px-4 py-2">{score.score}</td>
                                <td className="px-4 py-2">{score.score_percent}</td>
                                <td className="px-4 py-2 flex justify-center">
                                    <button
                                        onClick={() => { onScoreSelected(score) }}
                                        className="bg-gray-800 text-white rounded pointer py-2 px-4 hover:bg-gray-600 align-middle shadow table vertical-centered"
                                    >
                                        Challenge
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    ) : (
            <p className="text-center">There is currently no score data to show.</p>
        )
};

ChallengeScoresTable.propTypes = {
    scores: PropTypes.array.isRequired,
    onScoreSelected: PropTypes.func.isRequired,
};

export default ChallengeScoresTable;
