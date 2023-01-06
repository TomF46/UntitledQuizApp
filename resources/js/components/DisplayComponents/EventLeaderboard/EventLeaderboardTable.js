import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventLeaderboardTable = ({ scores, startingPosition }) => {
    return scores.length > 0 ? (
        <div className="flex justify-center">
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => {
                        return (
                            <tr className="border-t border-gray-200 text-center" key={score.id}>
                                <td className="px-4 py-2">{startingPosition + index}</td>
                                <td className="px-4 py-2 font-bold text-secondary"><Link to={`/profile/${score.user_id}`}>{score.username}</Link></td>
                                <td className="px-4 py-2">{score.score}</td>
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

EventLeaderboardTable.propTypes = {
    scores: PropTypes.array.isRequired,
    startingPosition: PropTypes.number
};

export default EventLeaderboardTable;
