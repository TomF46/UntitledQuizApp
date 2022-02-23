import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { friendRequest } from "../../../api/userApi";
import { toast } from "react-toastify";
import history from "../../../history";

const ProfileSidebar = ({ user, currentUser, isAdmin, onToggleFollow, onLogout, onToggleBanned, reloadUser }) => {

    function sendFriendRequest() {
        friendRequest(user.id).then(res => {
            reloadUser();
            toast.success("Request sent");
        }).catch(err => {
            toast.error(`Failed to send friend request ${err.message}`);
        })
    }

    function seeRequests() {
        history.push('/friends');
    }

    return (
        <>
            <h2 className="font-bold text-primary text-4xl py-4 text-center">
                {user.username}
            </h2>
            <div>
                <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
            </div>

            <div className="text-center my-4">
                {user.id != currentUser && user.isFriend && (
                    <div className="p-4 flex justify-center items-center">
                        <div className="rounded-full py-1 px-4 bg-primary hover:opacity-75 my-1 text-white shadow">Friend</div>
                    </div>
                )}
                <h3 className="text-lg font-bold">User Info</h3>
                {user.isAdmin && <p className="font-bold">Administrator</p>}
                {user.isBanned && <p className="font-bold text-red-400">Banned</p>}
                {(!user.isBanned || isAdmin) && (
                    <>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Quizzes created: {user.totalQuizzesCreated}</p>
                        <p>Quiz Attempts: {user.quizAttempts}</p>
                        <p>Challenge points: {user.challengePoints}</p>
                    </>
                )}
            </div>
            {(!user.isBanned || isAdmin) && (
                <>
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold">User Bio</h3>
                        {user.bio ? (<p>{user.bio}</p>) : (<p>No user biography set, please add one so we can get to know you better</p>)}
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        {user.id == currentUser ? (
                            <>
                                <Link
                                    to={`/profile/${user.id}/edit`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span className="ml-1">Edit Profile</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="ml-1">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {user.isFriend ? (
                                    <>
                                        <p className="font-bold">This user is your friend</p>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => { user.hasFriendRequest ? seeRequests() : sendFriendRequest() }}
                                            className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                        >
                                            <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <span className="ml-1">{user.hasFriendRequest ? "See request" : "Send Friend Request"}</span>
                                        </button>
                                    </>
                                )
                                }
                                <button
                                    type="button"
                                    onClick={onToggleFollow}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {user.following ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        )}
                                    </svg>
                                    <span className="ml-1">{user.following ? "Unfollow" : "Follow"}</span>
                                </button>
                                <Link
                                    to={`/profile/${user.id}/challenge`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="ml-1">Challenge</span>
                                </Link>
                                {
                                    isAdmin && (
                                        <>
                                            <p className="font-bold my-2">Admin controls</p>
                                            <button
                                                type="button"
                                                onClick={onToggleBanned}
                                                className="border border-red-400 text-red-400 text-center rounded py-2 px-4 hover:bg-red-600 hover:text-white shadow inline-flex items-center justify-center"
                                            >
                                                <svg className="text-red-400 hover:text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span className="ml-1">{user.isBanned ? 'Unban' : 'Ban'}</span>
                                            </button>
                                        </>
                                    )
                                }
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

ProfileSidebar.propTypes = {
    user: PropTypes.object.isRequired,
    onToggleFollow: PropTypes.func.isRequired,
    onToggleBanned: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    reloadUser: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    currentUser: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.tokens.user_id,
        isAdmin: state.isAdmin
    };
};


export default connect(mapStateToProps)(ProfileSidebar);

