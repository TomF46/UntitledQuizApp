import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserById } from "../../api/userApi";
import { toast } from "react-toastify";

const DashboardPage = ({userId, history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.profile.id);
            }).catch(error => {
                console.log("Error getting user " + error);
                toast.error("Error getting user " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [userId, user])

    return (
        <div className="dashboard-page">
            {user == null ? (
                <p>...Loading Dashboard</p>
            ) : (
            <h1 className="font-bold text-4xl my-4">Welcome {user.profile.username}</h1>
            //Plan whats going here
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
