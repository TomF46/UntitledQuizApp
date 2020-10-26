import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";
import FollowingQuizDashboard from "./Components/FollowingQuizDashboard";
import FollowingUsersDashboard from "./Components/FollowingUsersDashboard";
import ScoreDashboard from "./Components/ScoreDashboard";
import PopularQuizzesDashboard from "./Components/PopularQuizzesDashboard";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { Link } from "react-router-dom";

const DashboardPage = ({ userId, history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            getUserById(userId).then(userData => {
                console.log(userData);
                setUser(userData);
            }).catch(error => {
                toast.error("Error getting user " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    return (
        <div className="dashboard-page overflow-hidden shadow-lg page">
            {user == null ? (
                <LoadingMessage message={'Loading Dashboard'} />
            ) : (
                    <div className="grid grid-cols-12 pb-4">
                        <div className="col-span-3 px-4">
                            <h1 className="font-bold text-4xl my-4 text-center">Welcome {user.username}</h1>
                            <div className="mb-4">
                                <img src={user.profile_image} alt="profile-picture" className="rounded-full profile-photo shadow" />
                            </div>
                            <p className="text-center my-4 font-bold">Actions</p>
                            <div className="flex flex-col justify-center">
                                <Link to="/profile" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 hover:text-white shadow">View profile</Link>
                                <Link to="/explore" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 hover:text-white shadow my-4">Explore</Link>
                                <Link to="/quiz" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 hover:text-white shadow">Create</Link>
                            </div>
                        </div>
                        <div className="col-span-9">
                            <div className="my-4">
                                <PopularQuizzesDashboard />
                            </div>
                            <div className="mb-4">
                                <FollowingUsersDashboard user={user} />
                            </div>
                            <div className="mb-4">
                                <FollowingQuizDashboard user={user} />
                            </div>
                            {/* <div>
                                <ScoreDashboard user={user} />
                            </div> */}
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
