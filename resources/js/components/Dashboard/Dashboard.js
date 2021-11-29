import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";
import FollowingQuizDashboard from "./Components/FollowingQuizDashboard";
import FollowingUsersDashboard from "./Components/FollowingUsersDashboard";
import PopularQuizzesDashboard from "./Components/PopularQuizzesDashboard";
import RecommendedQuizzesDashboard from "./Components/RecommendedQuizzesDashboard";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { Link } from "react-router-dom";
import ChallengesDashboard from "./Components/ChallengesDashboard";
import { getRandomQuiz } from "../../api/quizApi";

const DashboardPage = ({ userId, history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
            }).catch(error => {
                toast.error(`Error getting user ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    function goToRandomQuiz() {
        getRandomQuiz().then(quizData => {
            history.push(`/quiz/${quizData.id}/play`);
        }).catch(error => {
            toast.error(`Error getting random quiz ${error.message}`, {
                autoClose: false,
            });
        })
    }

    return (
        <div className="dashboard-page">
            {user == null ? (
                <LoadingMessage message={'Loading Dashboard'} />
            ) : (
                <div className="grid grid-cols-12 pb-4">
                    <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow card">
                        <h1 className="font-bold text-4xl my-4 text-center">Welcome {user.username}</h1>
                        <div className="mb-4">
                            <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo shadow" />
                        </div>
                        <p className="text-center my-4 font-bold">Actions</p>
                        <div className="flex flex-col justify-center">
                            <Link to="/profile" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-secondary hover:text-white hover:border-white shadow mb-4">View profile</Link>
                            <Link to="/explore" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-secondary hover:text-white hover:border-white shadow mb-4">Explore</Link>
                            <Link to="/quiz" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-secondary hover:text-white hover:border-white shadow mb-4">Create</Link>
                            <button onClick={() => goToRandomQuiz()} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-secondary hover:text-white hover:border-white shadow">Play random quiz</button>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <div className="mb-6 overflow-hidden shadow card">
                            <PopularQuizzesDashboard />
                        </div>
                        <div className="mb-6 overflow-hidden shadow card">
                            <RecommendedQuizzesDashboard />
                        </div>
                        <div className="mb-6 overflow-hidden shadow card">
                            <FollowingUsersDashboard />
                        </div>
                        <div className="mb-6 overflow-hidden shadow card">
                            <FollowingQuizDashboard />
                        </div>
                        <div className="overflow-hidden shadow card">
                            <ChallengesDashboard />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

DashboardPage.propTypes = {
    userId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.tokens.user_id
    };
};

export default connect(mapStateToProps)(DashboardPage);
