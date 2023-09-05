import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";
import FollowingQuizDashboard from "./Components/FollowingQuizDashboard";
import FollowingUsersDashboard from "./Components/FollowingUsersDashboard";
import PopularQuizzesDashboard from "./Components/PopularQuizzesDashboard";
import RecommendedQuizzesDashboard from "./Components/RecommendedQuizzesDashboard";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { Link, useHistory } from "react-router-dom";
import ChallengesDashboard from "./Components/ChallengesDashboard";
import { getRandomQuiz } from "../../api/quizApi";
import FriendRequestsDashboard from "./Components/FriendRequestsDashboard";
import NotificationsDashboard from "./Components/NotificationsDashboard";
import UnpublishedQuizDashboard from "./Components/UnpublishedQuizDashboard";
import FollowedUsersList from "./Sidebar/FollowedUsersList";
import LiveEventsList from "./Sidebar/LiveEventsList";

const DashboardPage = () => {
    const history = useHistory()
    const userId = useSelector((state) => state.tokens.user_id);
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
                    <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0">
                        <div className="px-4 pb-4 overflow-hidden shadow card mb-4">
                            <h1 className="font-bold text-primary text-primary text-4xl my-4 text-center">Welcome {user.username}</h1>
                            <div className="mb-4">
                                <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo shadow" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <Link
                                    to={`/explore`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1 font-bold">Explore</span>
                                </Link>
                                <Link
                                    to={`/quiz`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span className="ml-1 font-bold">Create</span>
                                </Link>
                                <Link
                                    to={`/profile`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="ml-1 font-bold">View Profile</span>
                                </Link>
                                <Link
                                    to={`/notifications`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="ml-1 font-bold">Notifications</span>
                                </Link>
                                <Link
                                    to={`/friends`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="ml-1 font-bold">Manage Friends</span>
                                </Link>
                                <button onClick={() => goToRandomQuiz()} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center mb-4">
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1 font-bold">Play Random Quiz</span>
                                </button>
                            </div>
                        </div>
                        <div className="px-4 pb-4 overflow-hidden shadow card mb-4">
                            <LiveEventsList />
                        </div>
                        <div className="px-4 pb-4 overflow-hidden shadow card">
                            <FollowedUsersList />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <div className="mb-4 overflow-hidden shadow card">
                            <NotificationsDashboard />
                        </div>
                        <FriendRequestsDashboard />
                        <UnpublishedQuizDashboard />
                        <div className="mb-4 overflow-hidden shadow card">
                            <PopularQuizzesDashboard />
                        </div>
                        <div className="mb-4 overflow-hidden shadow card">
                            <RecommendedQuizzesDashboard />
                        </div>
                        {/* <div className="mb-4 overflow-hidden shadow card">
                            <FollowingUsersDashboard />
                        </div> */}
                        <div className="mb-4 overflow-hidden shadow card">
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

export default DashboardPage;
