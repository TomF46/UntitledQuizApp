import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";
import { Register } from "../../../api/authenticationApi";
import CenterFormCard from "../../DisplayComponents/CenterFormCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const RegisterPage = ({ userIsAuthenticated, history }) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function formIsValid() {
        const { username, email, password, password_confirmation } = user;
        const errors = {};
        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (!password_confirmation)
            errors.password_confirmation = "Confirmation is required";
        if (password_confirmation != password)
            errors.password_confirmation =
                "Password confirmation does not match password";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        Register(user)
            .then(response => {
                history.push("/login");
            })
            .catch(err => {
                setSaving(false);
                setErrors({ onSave: err.message });
            });
    }

    return (
        <>
            {userIsAuthenticated && <Redirect to="/dashboard" />}
            <CenterFormCard
                content={
                    <RegisterForm
                        user={user}
                        errors={errors}
                        onChange={handleChange}
                        onSave={handleSave}
                        saving={saving}
                    />
                }
            />
        </>
    );
};

RegisterPage.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(RegisterPage);
