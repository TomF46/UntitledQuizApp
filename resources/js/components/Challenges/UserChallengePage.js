import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getScoresForUser, getScoresWithPaginator, getUserById } from "../../api/userApi";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import ChallengeScoresTableWithPagination from "../DisplayComponents/ChallengeScoresTableWithPagination";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { sendChallenge } from "../../api/challengesApi";


const UserChallengesPage = ({ userId, currentUser, history }) => {
    const [recipient, setRecipient] = useState(null);
    const [scoresPaginator, setScoresPaginator] = useState(null);

    useEffect(() => {
        if (!recipient || recipient.id != userId) {
            getUserById(userId).then(userData => {
                setRecipient(userData);
            }).catch(error => {
                toast.error("Error getting user " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [userId, recipient])

    useEffect(() => {
        getCurrentUserScores();
    }, currentUser)

    function getCurrentUserScores() {
        getScoresForUser(currentUser).then(scoreData => {
            setScoresPaginator(scoreData);
        }).catch(error => {
            toast.error("Error getting current users scores " + error.message, {
                autoClose: false,
            });
        });
    }

    function getScoresPage(url) {
        getScoresWithPaginator(url).then(scoreData => {
            setScoresPaginator(scoreData);
        }).catch(error => {
            toast.error("Error getting current users scores " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleScoreSelected(score) {
        confirmAlert({
            title: "Confirm deletion",
            message: `Are you sure you want to challenge ${recipient.username} with this score?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => sendChallengeToApi(score),
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function sendChallengeToApi(score) {
        sendChallenge(recipient.id, score.id).then(response => {
            toast.success("Challenge sent");
            history.push(`/challenges`);
        })
            .catch(err => {
                toast.error("Error sending challenge, please try again", {
                    autoClose: false
                });
            });
    }

    return (
        <div className="user-challenge-page">
            {recipient == null ? (
                <LoadingMessage message={'Loading user to challenge'} />
            ) : (
                    <div className="grid grid-cols-12 pb-4">
                        <div className="col-span-12 lg:col-span-3 lg:mr-4 px-4 overflow-hidden shadow-lg page">
                            <h2 className="font-bold text-4xl py-4 text-center">
                                {recipient.username}
                            </h2>
                            <div>
                                <img src={recipient.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
                            </div>
                            <div className="text-center my-4">
                                <h3 className="text-lg font-bold">User Info</h3>
                                <p>Username: {recipient.username}</p>
                                <p>Email: {recipient.email}</p>
                                <p>Quizzes created: {recipient.totalQuizzesCreated}</p>
                            </div>
                            <div className="text-center my-4">
                                <h3 className="text-lg font-bold">Challenge</h3>
                                <p>Choose one of your own scores from the list to challenge {recipient.username}, they must match or beat your score to succeed</p>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow-lg page">
                            <div className="my-4">
                                <div className="flex">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-3xl">
                                            Your scores
                                        </h3>
                                        {!scoresPaginator ? (
                                            <div className="flex justify-center">
                                                <LoadingMessage message={'Loading your scores'} />
                                            </div>
                                        ) : (
                                                <ChallengeScoresTableWithPagination paginationData={scoresPaginator} onPageChange={getScoresPage} onScoreSelected={handleScoreSelected} />
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>

    );
};

UserChallengesPage.propTypes = {
    userId: PropTypes.any.isRequired,
    currentUser: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userId: ownProps.match.params.userId,
        currentUser: state.tokens.user_id
    };
};


export default connect(mapStateToProps)(UserChallengesPage);

