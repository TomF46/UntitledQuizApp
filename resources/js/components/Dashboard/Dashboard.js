import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";
import FollowingQuizDashboard from "./Components/FollowingQuizDashboard";
import FollowingUsersDashboard from "./Components/FollowingUsersDashboard";
import ScoreDashboard from "./Components/ScoreDashboard";
import PopularQuizzesDashboard from "./Components/PopularQuizzesDashboard";

const DashboardPage = ({userId, history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                // getUserScores(userData.profile.id);
            }).catch(error => {
                console.log("Error getting user " + error);
                toast.error("Error getting user " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    return (
        <div className="dashboard-page overflow-hidden shadow-lg page">
            {user == null ? (
                <p className="text-center">...Loading Dashboard</p>
            ) : (
            <div>
                <h1 className="font-bold text-4xl my-4 text-center">Welcome {user.profile.username}</h1>
                <div className="mb-4">
                    <PopularQuizzesDashboard />
                </div>
                <div className="mb-4">
                    <FollowingUsersDashboard user={user} />
                </div>
                <div className="mb-4">
                    <FollowingQuizDashboard user={user} />
                </div>
                <div className="mb-4">
                    <ScoreDashboard user={user} />
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
    const userId = state.tokens.user_id;
    return {
        userId
    };
};

export default connect(mapStateToProps)(DashboardPage);
