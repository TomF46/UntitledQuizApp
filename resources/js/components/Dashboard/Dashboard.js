import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";
import QuizDashboard from "./Components/QuizDashboard";
import ScoreDashboard from "./Components/ScoreDashboard";

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
                    <QuizDashboard user={user} />
                </div>
                <div className="p-4  mb-4">
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
