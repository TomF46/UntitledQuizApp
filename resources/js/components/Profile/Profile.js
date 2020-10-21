import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, getScoresForUser, getScoresWithPaginator, getUserById } from "../../api/userApi";
import ScoresTable from "../DisplayComponents/ScoresTable";
import { toast } from "react-toastify";
import { getQuizzesByUser, getQuizzesWithPagination } from "../../api/quizApi";
import PaginationControls from "../DisplayComponents/PaginationControls";
import QuizListWithPagination from "../DisplayComponents/QuizListWithPagination";

const ProfilePage = ({ userId, currentUser, history, ...props }) => {
    const [user, setUser] = useState(null);
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [scoresPaginator, setScoresPaginator] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.id);
                getUserQuizzes(userData.id);
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
            setScoresPaginator(scoreData);
        }).catch(error => {
            console.log("Error getting user scores" + error);
            toast.error("Error getting user scores " + error.message,{
                autoClose: false,
            });
        });
    }

    function getUserQuizzes(id){
        getQuizzesByUser(id).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function getQuizzesPage(url){
        getQuizzesWithPagination(url).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function getScoresPage(url){
        getScoresWithPaginator(url).then(scoreData => {
            setScoresPaginator(scoreData);
        }).catch(error => {
            console.log("Error getting user scores" + error);
            toast.error("Error getting user scores " + error.message,{
                autoClose: false,
            });
        });
    }

    function toggleFollow(){
        let action = user.following ? "Unfollow" : "Follow";

        followUser(user.id).then(res => {
            toast.success(`User ${action}ed`);
            let tempUser = {...user};
            tempUser.following = !tempUser.following;
            setUser({...tempUser});
        }).catch(err => {
            toast.error(`Failed to ${action} ${err.message}`);
        })
    }

    return (
        <div className="profile-page overflow-hidden shadow-lg page">
            {user == null ? (
                <p>...Loading profile</p>
            ) : (
                <>
                <h2 className="font-bold text-4xl py-4 text-center pageHeader">
                        {user.username} 
                    </h2>
                <div className="border-b p-2">
                {userId == currentUser ? (
                        <button
                            type="button"
                            onClick={() => history.push(`/profile/${userId}/edit`)}
                            className="bg-purple-400 text-white text-sm rounded py-2 px-4 hover:bg-purple-500 inline-flex items-center shadow"
                        >
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="ml-1">Edit Profile</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleFollow}
                            className="bg-purple-400 text-white text-sm rounded py-2 px-4 hover:bg-purple-500 inline-flex items-center"
                        >
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {user.following ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />  
                            )}
                            </svg>
                            <span className="ml-1">{user.following ? "Unfollow" : "Follow"}</span>
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 p-4 border-b mb-4">
                    <div>
                        <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">User Info:</h3>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Quizzes created: {user.totalQuizzesCreated}</p>
                        {scoresPaginator && <p>Quiz Attempts: {scoresPaginator.total}</p> }
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">User Bio:</h3>  
                        {user.bio ? (<p>Bio: {user.bio}</p>) : (<p>No user biography set, please add one so we can get to know you better</p>) }
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-3xl text-center mb-2">
                        Created quizzes
                    </h3>
                    {quizzesPaginator ? (
                        <div className="border-t">
                            <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                        </div>
                    ) : (
                        <p className="text-center">Use has not created any quizzes</p>
                    )}
                </div>
                <div className="my-4">
                        <div className="flex justify-center">
                            <div className="mb-4">
                                <h3 className="font-bold text-3xl text-center">
                                    Scores
                                </h3>
                                {!scoresPaginator ? (
                                    <p>... Loading scores</p>
                                ) : (
                                    <>
                                    <ScoresTable scores={scoresPaginator.data} />
                                    <PaginationControls to={scoresPaginator.to} from={scoresPaginator.from} of={scoresPaginator.total} onNext={() => getScoresPage(scoresPaginator.next_page_url)} onPrevious={() => getScoresPage(scoresPaginator.prev_page_url)} currentPage={scoresPaginator.current_page} lastPage={scoresPaginator.last_page} />
                                    </>
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
