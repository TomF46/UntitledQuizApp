import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { register } from "../../../api/authenticationApi";
import CenterFormCard from "../../DisplayComponents/CenterFormCard";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import IntroSection from "../../DisplayComponents/IntroSection";
import IntroHeader from "../../DisplayComponents/IntroHeader";

const RegisterPage = () => {
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    const history = useHistory();
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
        register(user)
            .then(response => {
                toast.success("Successfully registered");
                history.push("/login");
            })
            .catch(err => {
                setSaving(false);
                toast.error(formatErrorText(err), {
                    autoClose: false,
                });
            });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    return (
        <>
            {userIsAuthenticated && <Redirect to="/" />}
            <div className="grid grid-cols-12 intro-page">
                <div className="col-span-12 px-4">
                    <IntroHeader />
                </div>
                <div className="col-span-12 px-4">
                    <IntroSection />
                </div>
                <div className="col-span-12 px-4 text-center mb-8">
                    <Link className="border border-primary text-primary rounded py-2 font-bold px-4 hover:border-secondary hover:text-secondary hover:opacity-75 shadow text-xl" to={`/about`}>About QApp</Link>
                </div>
                <div className="col-span-12 px-4 pb-4">
                    <CenterFormCard
                        content={
                            <>
                                <RegisterForm
                                    user={user}
                                    errors={errors}
                                    onChange={handleChange}
                                    onSave={handleSave}
                                    saving={saving}
                                />
                                <div className="flex justify-center mt-4">
                                    <Link
                                        to={`/login`}
                                        className="text-center hover:text-gray-600 hover:underline"
                                    >
                                        Already registered? Login now!
                                    </Link>
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
