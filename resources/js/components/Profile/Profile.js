import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, getScoresForUser, getScoresWithPaginator, getUserById } from "../../api/userApi";
import ScoresTable from "../DisplayComponents/ScoresTable";
import QuizList from "../DisplayComponents/QuizList";
import { toast } from "react-toastify";
import { getQuizzesByUser, getQuizzesWithPagination } from "../../api/quizApi";
import PaginationControls from "../DisplayComponents/PaginationControls";

const ProfilePage = ({ userId, currentUser, history, ...props }) => {
    const [user, setUser] = useState(null);
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [scoresPaginator, setScoresPaginator] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.profile.id);
                getUserQuizzes(userData.profile.id);
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

        followUser(user.profile.id).then(res => {
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
                        {user.profile.username} 
                    </h2>
                <div className="border-b p-2">
                {userId == currentUser ? (
                        <button
                            type="button"
                            onClick={() => history.push(`/profile/${userId}/edit`)}
                            className="bg-purple-400 text-white text-sm rounded py-2 px-4 hover:bg-purple-500"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleFollow}
                            className="bg-purple-400 text-white text-sm rounded py-2 px-4 hover:bg-purple-500"
                        >
                            {user.following ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 p-4 border-b mb-4">
                    <div>
                        <img src={user.profile.profile_image} alt="profile-picture" className="rounded-full profile-photo" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">User Info:</h3>
                        <p>Username: {user.profile.username}</p>
                        <p>Email: {user.profile.email}</p>
                        <p>Quizzes created: {user.quizzes.length}</p>
                        {scoresPaginator && <p>Quiz Attempts: {scoresPaginator.total}</p> }
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
                    {quizzesPaginator ? (
                        <div className="border-t">
                            <QuizList quizzes={quizzesPaginator.data} />
                            <PaginationControls to={quizzesPaginator.to} from={quizzesPaginator.from} of={quizzesPaginator.total} onNext={() => getQuizzesPage(quizzesPaginator.next_page_url)} onPrevious={() => getQuizzesPage(quizzesPaginator.prev_page_url)} currentPage={quizzesPaginator.current_page} lastPage={quizzesPaginator.last_page} />
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
