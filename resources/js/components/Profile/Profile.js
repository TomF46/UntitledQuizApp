import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followUser, getUserById, toggleBan } from "../../api/userApi";
import { toast } from "react-toastify";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { logout } from "../../redux/actions/authenticationActions";
import UsersQuizList from "./Sections/UsersQuizList";
import UsersBestScoresList from "./Sections/UsersBestScoresList";
import ProfileSidebar from "./Sections/ProfileSidebar";

const ProfilePage = ({ userId, history, logout, isAdmin, ...props }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user || user.id != userId) {
            getUserById(userId).then(userData => {
                setUser(userData);
            }).catch(error => {
                toast.error(`Error getting user ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [userId, user])


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
                            <ProfileSidebar user={user} onLogout={handleLogout} onToggleBanned={toggleBanned} onToggleFollow={toggleFollow} />
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                            {!user.isBanned || isAdmin ? (
                                <>
                                    <UsersQuizList user={user} />
                                    <UsersBestScoresList user={user} />
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
    history: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userId: ownProps.match.params.userId ? ownProps.match.params.userId : state.tokens.user_id,
        isAdmin: state.isAdmin
    };
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
