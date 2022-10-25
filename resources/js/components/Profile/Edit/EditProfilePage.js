import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserForEditing, editUserProfile } from "../../../api/userApi"
import EditProfileForm from "./EditProfileForm";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { storeImage } from "../../../api/imagesApi";

const EditProfilePage = ({ userId, history }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        if (!user) {
            getUserForEditing(userId).then(userData => {
                setUser(userData);
            }).catch(error => {
                toast.error(`Error getting user ${error.message}`, {
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

    function handleFileChange(event) {
        let file = event.target.files[0];
        toast.info("Uploading image");
        storeImage(file).then(res => {
            toast.success("Sucessfully uploaded image");
            setUser(prevUser => ({
                ...prevUser,
                'profile_image': res.path
            }));
        }).catch(error => {
            toast.error("Unable to uploaded image");
        });
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
            toast.error(`Error updating profile ${error.message}`, {
                autoClose: false,
            });
        })
    }

    return (
        <div className="shadow page">
            {user == null ? (
                <LoadingMessage message={'Loading user'} />
            ) : (
                <EditProfileForm user={user} onChange={handleChange} onFileChange={handleFileChange} errors={errors} saving={saving} onSave={handleSave} />
            )}
        </div>
    );
};

EditProfilePage.propTypes = {
    userId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.tokens.user_id
    };
};

export default connect(mapStateToProps)(EditProfilePage);
