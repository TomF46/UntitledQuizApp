import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getScoresForUser } from "../../../api/userApi";
import ScoresTableWithPagination from "../../DisplayComponents/ScoresTableWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";

const ScoreDashboard = ({ user }) => {
    const [scoresPaginator, setScores] = useState(null);

    useEffect(() => {
        if (!scoresPaginator) {
            getScoresForUser(user.id).then(scoreData => {
                setScores(scoreData);
            }).catch(error => {
                toast.error(`Error getting user scores ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [scoresPaginator])

    function getScoresPage(url) {
        getPageWithPaginationUrl(url).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            toast.error(`Error getting user scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="score-dashboard px-4">
            {scoresPaginator == null ? (
                <LoadingMessage message={'Loading scores dashboard'} />
            ) : (
                <>
                    <h1 className="font-bold text-2xl mb-2">Your highest scores</h1>
                    <div className="border-b">
                        <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={getScoresPage} showUser={false} showQuiz={true} />
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
