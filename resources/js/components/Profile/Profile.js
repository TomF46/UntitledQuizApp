import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForUser, getUserById } from "../../api/userApi";
import ScoresTable from "../DisplayComponents/ScoresTable";
import QuizList from "../DisplayComponents/QuizList";

const ProfilePage = ({ userId, currentUser, history, ...props }) => {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.profile.id);
            }).catch(error => {
                console.log("Error getting user " + error);
            });
        }
    }, [userId, user])

    function getUserScores(id){
        getScoresForUser(id).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            console.log("Error getting user " + error);
        });
    }

    return (
        <div className="profile-page mt-8">
            {user == null ? (
                <p>...Loading profile</p>
            ) : (
                <>
                <h2 className="font-bold text-4xl my-4 text-center pageHeader">
                        {user.profile.username}
                    </h2>
                <div className="p-4 rounded overflow-hidden shadow-lg card card mb-4">
                    <p>Username: {user.profile.username}</p>
                    <p>Email: {user.profile.email}</p>
                    {user.profile.bio && <p>Bio: {user.profile.bio}</p> }
                    <p>Quizzes created: {user.quizzes.length}</p>
                    {scores && <p>Quiz Attempts: {scores.length}</p> }
                    {userId == currentUser && (
                        <div className="flex justify-between items-center">
                            <div className="flex">
                            </div>
                            <div className="flex justify-right">
                                <button
                                    type="button"
                                    onClick={() => history.push(`/profile/${userId}/edit`)}
                                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 mr-2"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-3xl text-center mb-2">
                        Created quizzes
                    </h3>
                    {user.quizzes.length > 0 ? (
                        <QuizList quizzes={user.quizzes} />
                    ) : (
                        <p className="text-center">Use has not created any quizzes</p>
                    )}
                </div>
                <div className="my-4">
                    <h3 className="font-bold text-3xl text-center">
                        Scores
                    </h3>
                    {!scores ? (
                        <p>... Loading scores</p>
                    ) : (
                        <div className="p-4 rounded overflow-hidden shadow-lg card card mb-4">
                            <ScoresTable scores={scores} />
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
    );
};

ProfilePage.propTypes = {
    userId: PropTypes.any.isRequired,
    currentUser: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.tokens.user_id
    const userId = ownProps.match.params.userId ? ownProps.match.params.userId : state.tokens.user_id;
    return {
        userIsAuthenticated: state.tokens != null,
        userId,
        currentUser
    };
};

export default connect(mapStateToProps)(ProfilePage);
