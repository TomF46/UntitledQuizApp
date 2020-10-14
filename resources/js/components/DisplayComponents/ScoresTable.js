import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ScoresTable = ({ scores }) => {
    return (
        <div className="flex justify-center">
            <table class="table-auto">
                <thead>
                    <tr>
                    <th class="px-4 py-2">User</th>
                    <th class="px-4 py-2">Quiz</th>
                    <th class="px-4 py-2">Score</th>
                    <th class="px-4 py-2">Score %</th>
                    </tr>
                </thead>
                <tbody>
                {scores.map((score) => {
                    return (
                        <tr key={score.id}>
                        <td class="border px-4 py-2"><Link to={`/profile/${score.user_id}`}>{score.username}</Link></td>
                        <td class="border px-4 py-2"><Link to={`/quiz/${score.quiz_id}`}>{score.quiz_name}</Link></td>
                        <td class="border px-4 py-2">{score.score}</td>
                        <td class="border px-4 py-2">{score.score_percent}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
        </div>
    );
};

ScoresTable.propTypes = {
    scores: PropTypes.array.isRequired,
};

export default ScoresTable;
