import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getActiveChallengesWithPaginator, getActiveChallenges } from "../../../api/challengesApi"
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import ChallengeListWithPagination from "../../DisplayComponents/ChallengesListWithPagination";

const ChallengesDashboard = ({ user }) => {
    const [challengesPaginator, setChallenges] = useState(null);


    useEffect(() => {
        if (!challengesPaginator) {
            getActiveChallenges().then(challengesData => {
                setChallenges(challengesData)
            }).catch(error => {
                toast.error(`Error getting challenges ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [challengesPaginator])

    function getChallengesPage(url) {
        getActiveChallengesWithPaginator(url).then(challengesData => {
            setChallenges(challengesData);
        }).catch(error => {
            toast.error(`Error getting challenges ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="challenges-dashboard px-4 py-2">
            {challengesPaginator == null ? (
                <LoadingMessage message={'Loading challenges dashboard'} />
            ) : (
                <div>
                    <h1 className="font-bold text-2xl text-center md:text-left">Your active challenges</h1>
                    {challengesPaginator.total > 0 ? (
                        <div>
                            <ChallengeListWithPagination paginationData={challengesPaginator} onPageChange={getChallengesPage} />
                        </div>
                    ) : (
                        <p>You dont currently have any active challenges.</p>
                    )}
                </div>
            )}
        </div>
    );
};

ChallengesDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ChallengesDashboard;
