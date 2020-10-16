import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getScoresForUser } from "../../../api/userApi";
import ScoresTable from "../../DisplayComponents/ScoresTable";

const ScoreDashboard = ({ user }) => {
    const [scores, setScores] = useState(null);

    useEffect(() => {
        if(!scores) {
            getScoresForUser(user.profile.id).then(scoreData => {
                setScores(scoreData);
            }).catch(error => {
                console.log("Error getting user scores" + error);
                toast.error("Error getting user scores " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [scores])

    return (
        <div className="score-dashboard">
            {scores == null ? (
                <p>...Loading score dashboard</p>
            ) : (
                <ScoresTable scores={scores} />
            )}
        </div>
    );
};

ScoreDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ScoreDashboard;
