import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getUserForEditing, editUserProfile } from "../../../api/userApi"
import EditProfileForm from "./EditProfileForm";

const EditProfilePage = ({userId, history }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        if(!user) {
            getUserForEditing(userId).then(userData => {
                setUser(userData);
            }).catch(error => {
                console.log("Error getting user " + error);
            });
        }
    }, [userId, user])

    function handleChange(event) {
        const { name, value } = event.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function formIsValid() {
        const { username, bio } = user;
        const errors = {};
        if (!username) errors.username = "Username is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        
        editUserProfile(userId, user).then(response => {
            history.push("/profile")
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="edit-profile-page">
            {user == null ? (
                <p>...Loading user</p>
            ) : ( 
                <EditProfileForm user={user} onChange={handleChange} errors={errors} saving={saving} onSave={handleSave} />
            )}
        </div>
    );
};

EditProfilePage.propTypes = {
    userId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const userId = state.tokens.user_id;
    return {
        userId
    };
};

export default connect(mapStateToProps)(EditProfilePage);
