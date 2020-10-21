import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getScoresForUser, getScoresWithPaginator } from "../../../api/userApi";
import ScoresTableWithPagination from "../../DisplayComponents/ScoresTableWithPagination";

const ScoreDashboard = ({ user }) => {
    const [scoresPaginator, setScores] = useState(null);

    useEffect(() => {
        if(!scoresPaginator) {
            getScoresForUser(user.id).then(scoreData => {
                setScores(scoreData);
            }).catch(error => {
                console.log("Error getting user scores" + error);
                toast.error("Error getting user scores " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [scoresPaginator])

    function getScoresPage(url){
        getScoresWithPaginator(url).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            console.log("Error getting user scores" + error);
            toast.error("Error getting user scores " + error.message,{
                autoClose: false,
            });
        });
    }

    return (
        <div className="score-dashboard">
            {scoresPaginator == null ? (
                <p>...Loading score dashboard</p>
            ) : (
                <>
                    <h1 className="font-bold text-xl p-4 border-b">Your highest scores</h1>
                    <div className="border-b">
                        <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={getScoresPage} />
                    </div>
                </>
            )}
        </div>
    );
};

ScoreDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ScoreDashboard;
