import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadCurrentUserProfile } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const ProfilePage = ({ loadCurrentUserProfile, history, ...props }) => {
    const [user, setUser] = useState({ ...props.user });

    useEffect(() => {
        if (props.user == null || _.isEmpty(props.user)) {
            console.log("In here");
            loadCurrentUserProfile().catch(err => {
                alert("Error getting user");
            });
        } else {
            setUser({ ...props.user });
        }
    }, [props.user]);

    return (
        <div className="profile-page mt-8">
            {user == null ? (
                <p>...Loading profile</p>
            ) : (
                <div>
                    <h2 className="font-bold text-3xl text-center">
                        {user.username}
                    </h2>
                    <p className="text-center">{user.email}</p>
                </div>
            )}
        </div>
    );
};

ProfilePage.propTypes = {
    user: PropTypes.object,
    loadCurrentUserProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        user: state.user
    };
};

const mapDispatchToProps = {
    loadCurrentUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
