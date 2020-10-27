import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ScoresTable = ({ scores, showUser, showQuiz, startingPosition }) => {
    return scores.length > 0 ? (
        <div className="flex justify-center">
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Position</th>
                        {showUser && <th className="px-4 py-2">User</th>}
                        {showQuiz && <th className="px-4 py-2">Quiz</th>}
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Score %</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => {
                        return (
                            <tr className="border-t border-gray-200 text-center" key={score.id}>
                                <td className="px-4 py-2">{startingPosition + index}</td>
                                {showUser && <td className="px-4 py-2"><Link to={`/profile/${score.user_id}`}>{score.username}</Link></td>}
                                {showQuiz && <td className="px-4 py-2"><Link to={`/quiz/${score.quiz_id}`}>{score.quiz_name}</Link></td>}
                                <td className="px-4 py-2">{score.score}</td>
                                <td className="px-4 py-2">{score.score_percent}</td>
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

ScoresTable.propTypes = {
    scores: PropTypes.array.isRequired,
    showUser: PropTypes.bool.isRequired,
    showQuiz: PropTypes.bool.isRequired,
    startingPosition: PropTypes.number
};

export default ScoresTable;
