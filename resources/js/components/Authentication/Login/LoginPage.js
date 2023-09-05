import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import { login } from "../../../redux/actions/authenticationActions";
import CenterFormCard from "../../DisplayComponents/CenterFormCard";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import IntroSection from "../../DisplayComponents/IntroSection";
import IntroHeader from "../../DisplayComponents/IntroHeader";

const LoginPage = () => {
    const dispatch = useDispatch();
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: "",
        remember_me: true
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value, checked } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: name == "remember_me" ? Boolean(checked) : value
        }));
    }

    function formIsValid() {
        const { email, password } = user;
        const errors = {};
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        dispatch(login(user))
            .then(() => {
                history.push("/");
            })
            .catch(err => {
                setSaving(false);
                toast.error(`${err.statusText} please try again.`, {
                    autoClose: false,
                });
            });
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
                                <LoginForm
                                    user={user}
                                    errors={errors}
                                    onChange={handleChange}
                                    onSave={handleSave}
                                    saving={saving}
                                />
                                <div className="flex justify-center mt-4">
                                    <Link
                                        to={`/register`}
                                        className="text-center hover:text-gray-600 hover:underline"
                                    >
                                        No account? Click here to register
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

export default LoginPage;
