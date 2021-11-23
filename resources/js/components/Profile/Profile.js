import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, getScoresForUser, getScoresWithPaginator, getUserById, toggleBan } from "../../api/userApi";
import { toast } from "react-toastify";
import { getQuizzesByUser, getQuizzesWithPagination } from "../../api/quizApi";
import QuizListWithPagination from "../DisplayComponents/QuizListWithPagination";
import ScoresTableWithPagination from "../DisplayComponents/ScoresTableWithPagination";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { logout } from "../../redux/actions/authenticationActions";

const ProfilePage = ({ userId, currentUser, history, logout, isAdmin, ...props }) => {
    const [user, setUser] = useState(null);
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [scoresPaginator, setScoresPaginator] = useState(null);

    useEffect(() => {
        if (!user || user.id != userId) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.id);
                getUserQuizzes(userData.id);
            }).catch(error => {
                toast.error(`Error getting user ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    function getUserScores(id) {
        getScoresForUser(id).then(scoreData => {
            setScoresPaginator(scoreData);
        }).catch(error => {
            toast.error(`Error getting user scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getUserQuizzes(id) {
        getQuizzesByUser(id).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error(`Error getting quizzes ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getQuizzesPage(url) {
        getQuizzesWithPagination(url).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error(`Error getting quizzes ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getScoresPage(url) {
        getScoresWithPaginator(url).then(scoreData => {
            setScoresPaginator(scoreData);
        }).catch(error => {
            toast.error(`Error getting user scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function toggleFollow() {
        let action = user.following ? "Unfollow" : "Follow";

        followUser(user.id).then(res => {
            toast.success(`User ${action}ed`);
            let tempUser = { ...user };
            tempUser.following = !tempUser.following;
            setUser({ ...tempUser });
        }).catch(err => {
            toast.error(`Failed to ${action} ${err.message}`);
        })
    }

    function handleLogout() {
        logout();
        toast.info("Logged out.");
    }

    function toggleBanned() {
        toggleBan(user.id, user.isBanned).then(res => {
            let tempUser = { ...user };
            tempUser.isBanned = !user.isBanned
            setUser({ ...tempUser });
        }).catch(err => {
            toast.error(`Failed to perform action ${err.message}`);
        })
    }

    return (
        <div className="profile-page">
            {user == null ? (
                <LoadingMessage message={'Loading profile'} />
            ) : (
                <>
                    <div className="grid grid-cols-12 pb-4">
                        <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow card">
                            <h2 className="font-bold text-4xl py-4 text-center">
                                {user.username}
                            </h2>
                            <div>
                                <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
                            </div>
                            <div className="text-center my-4">
                                <h3 className="text-lg font-bold">User Info</h3>
                                {user.isAdmin && <p className="font-bold">Administrator</p>}
                                {user.isBanned && <p className="font-bold">Banned</p>}
                                {!user.isBanned || isAdmin ? (
                                    <>
                                        <p>Username: {user.username}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Quizzes created: {user.totalQuizzesCreated}</p>
                                        {scoresPaginator && <p>Quiz Attempts: {scoresPaginator.total}</p>}
                                        <p>Challenge points: {user.challengePoints}</p>
                                    </>
                                ) : (<></>)}
                            </div>
                            {!user.isBanned || isAdmin ? (
                                <>
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-bold">User Bio</h3>
                                        {user.bio ? (<p>{user.bio}</p>) : (<p>No user biography set, please add one so we can get to know you better</p>)}
                                    </div>
                                    <div className="flex flex-col justify-center text-center">
                                        {userId == currentUser ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => history.push(`/profile/${userId}/edit`)}
                                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                                                >
                                                    <svg className="text-gray-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <span className="ml-1">Edit Profile</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                                                >
                                                    <svg className="text-gray-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span className="ml-1">Logout</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={toggleFollow}
                                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                                                >
                                                    <svg className="text-gray-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {user.following ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        )}
                                                    </svg>
                                                    <span className="ml-1">{user.following ? "Unfollow" : "Follow"}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => history.push(`/profile/${userId}/challenge`)}
                                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                                                >
                                                    <svg className="text-gray-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    <span className="ml-1">Challenge</span>
                                                </button>
                                                {
                                                    isAdmin && (
                                                        <>
                                                            <p className="font-bold my-2">Admin controls</p>
                                                            <button
                                                                type="button"
                                                                onClick={toggleBanned}
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
                            ) : (<></>)}
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                            {!user.isBanned || isAdmin ? (
                                <>
                                    <div className="mb-6 px-4 py-2 overflow-hidden shadow card">
                                        <h3 className="font-bold text-2xl text-center md:text-left">
                                            Created quizzes
                                        </h3>
                                        {quizzesPaginator ? (
                                            <div>
                                                {quizzesPaginator.total > 0 ? (
                                                    <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                                                ) : (
                                                    <p>User has not created any quizzes</p>
                                                )}

                                            </div>
                                        ) : (
                                            <LoadingMessage message={'Loading users quizzes'} />
                                        )}
                                    </div>
                                    <div className="px-4 py-2 overflow-hidden shadow card">
                                        <h3 className="font-bold text-2xl text-center md:text-left">
                                            Your Best Scores
                                        </h3>
                                        {scoresPaginator ? (
                                            <div>
                                                {scoresPaginator.total > 0 ? (
                                                    <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={getScoresPage} showUser={false} showQuiz={true} />
                                                ) : (
                                                    <p>User has not got any scores to show</p>
                                                )}

                                            </div>
                                        ) : (
                                            <LoadingMessage message={'Loding users scores'} />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="px-4 py-2 overflow-hidden shadow page">
                                    <h3 className="font-bold text-3xl mb-2 text-center">
                                        Banned
                                    </h3>
                                    <p className="text-center">This user is banned, their quizzes may still be available via the explore page if they do not break the rules.</p>
                                </div>
                            )}
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
    history: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userId: ownProps.match.params.userId ? ownProps.match.params.userId : state.tokens.user_id,
        currentUser: state.tokens.user_id,
        isAdmin: state.isAdmin
    };
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
