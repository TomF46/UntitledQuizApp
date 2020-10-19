import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForUser, getUserById } from "../../api/userApi";
import ScoresTable from "../DisplayComponents/ScoresTable";
import QuizList from "../DisplayComponents/QuizList";
import { toast } from "react-toastify";

const ProfilePage = ({ userId, currentUser, history, ...props }) => {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                console.log(userData);
                getUserScores(userData.profile.id);
            }).catch(error => {
                console.log("Error getting user " + error);
                toast.error("Error getting user " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    function getUserScores(id){
        getScoresForUser(id).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            console.log("Error getting user scores" + error);
            toast.error("Error getting user scores " + error.message,{
                autoClose: false,
            });
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
                    {userId == currentUser && (
                        <div className="flex justify-between items-center">
                            <div className="flex">
                            </div>
                            <div className="flex justify-right">
                                <button
                                    type="button"
                                    onClick={() => history.push(`/profile/${userId}/edit`)}
                                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 mb-2"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                <div className="grid grid-cols-3 p-4 rounded overflow-hidden shadow-lg card card mb-4">
                    <div>
                        <img src={user.profile.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">User Info:</h3>
                        <p>Username: {user.profile.username}</p>
                        <p>Email: {user.profile.email}</p>
                        <p>Quizzes created: {user.quizzes.length}</p>
                        {scores && <p>Quiz Attempts: {scores.length}</p> }
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">User Bio:</h3>  
                        {user.profile.bio ? (<p>Bio: {user.profile.bio}</p>) : (<p>No user biography set, please add one so we can get to know you better</p>) }
                    </div>
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
                        <div className="flex justify-center">
                            <div className="inline-block p-4 rounded overflow-hidden shadow-lg card card mb-4 border-t-8 border-purple-500">
                                <h3 className="font-bold text-3xl text-center">
                                    Scores
                                </h3>
                                {!scores ? (
                                    <p>... Loading scores</p>
                                ) : (
                                    <ScoresTable scores={scores} />
                                )}
                            </div>
                        </div>
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
