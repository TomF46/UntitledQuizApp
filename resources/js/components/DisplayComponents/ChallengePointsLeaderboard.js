import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChallengePointsLeaderboard = ({ rows, startingPosition }) => {
    return rows.length > 0 ? (
        <div className="flex justify-center">
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr className="border-t border-gray-200 text-center" key={row.id}>
                                <td className="px-4 py-2">{startingPosition + index}</td>
                                <td className="px-4 py-2 font-bold text-secondary">
                                    <Link to={`/profile/${row.id}`}>{row.username}</Link>
                                </td>
                                <td className="px-4 py-2">{row.challengePoints}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    ) : (
        <p className="text-center">There is currently no data to show.</p>
    )
};

ChallengePointsLeaderboard.propTypes = {
    rows: PropTypes.array.isRequired,
    startingPosition: PropTypes.number
};

export default ChallengePointsLeaderboard;
