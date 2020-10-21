import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getUserForEditing, editUserProfile } from "../../../api/userApi"
import EditProfileForm from "./EditProfileForm";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const EditProfilePage = ({userId, history }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        if(!user) {
            getUserForEditing(userId).then(userData => {
                setUser(userData);
            }).catch(error => {
                toast.error("Error getting user " + error.message,{
                    autoClose: false,
                });
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
            toast.success("Profile updated!")
            history.push("/profile")
        }).catch(error => {
            toast.error("Error updating profile " + error.message,{
                autoClose: false,
            });
        })
    }

    return (
        <div className="pt-6 overflow-hidden shadow-lg page">
            {user == null ? (
                <LoadingMessage message={'Loading user'} />
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
