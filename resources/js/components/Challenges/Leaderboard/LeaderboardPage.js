import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { getChallengePointsLeaderboard, getChallengePointsLeaderboardWithPaginator } from "../../../api/challengesApi";
import { toast } from "react-toastify";
import ChallengePointsLeaderboardWithPagination from "../../DisplayComponents/ChallengePointsLeaderboardWithPagination";

const ChallengesLeaderboardPage = ({ currentUser, history }) => {
    const [leaderboardPaginator, setLeaderboardPaginator] = useState(null);

    useEffect(() => {
        if (!leaderboardPaginator) {
            getChallengesLeaderboard();
        }
    }, leaderboardPaginator)

    function getChallengesLeaderboard() {
        getChallengePointsLeaderboard().then(leaderboardData => {
            setLeaderboardPaginator(leaderboardData);
        }).catch(error => {
            toast.error("Error getting challenge points leaderboard " + error.message, {
                autoClose: false,
            });
        });
    }

    function getChallengesLeaderboardPage(url) {
        getChallengePointsLeaderboardWithPaginator(url).then(leaderboardData => {
            setLeaderboardPaginator(leaderboardData);
        }).catch(error => {
            toast.error("Error getting challenge points leaderboard " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="challenge-leaderboard-page">
            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 px-4 overflow-hidden shadow-lg page">
                    <h2 className="font-bold text-2xl py-4 text-center">
                        Challenge points
                    </h2>
                    <p>
                        Earn points towards your total by challenging other users to beat your scores or by beating users who challenge you. <br></br> If your opponent matches or beats your score they get a challenge points if they fail you win a point towards the leaderboards.
                        </p>
                </div>
                <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow-lg page text-center">
                    <div>
                        <div className="flex justify-center">
                            <div className="mb-4">
                                <h3 className="font-bold text-4xl my-4 text-center">
                                    Challenge points leaderboards
                                </h3>
                                {!leaderboardPaginator ? (
                                    <div className="flex justify-center">
                                        <LoadingMessage message={'Loading challange points leaderboard'} />
                                    </div>
                                ) : (
                                        <ChallengePointsLeaderboardWithPagination paginationData={leaderboardPaginator} onPageChange={getChallengesLeaderboardPage} />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

ChallengesLeaderboardPage.propTypes = {
    currentUser: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.tokens.user_id
    };
};


export default connect(mapStateToProps)(ChallengesLeaderboardPage);

