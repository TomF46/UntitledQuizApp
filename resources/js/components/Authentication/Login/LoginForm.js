import React from "react";
import PropTypes from "prop-types";
import EmailInput from "../../FormComponents/EmailInput";
import PasswordInput from "../../FormComponents/PasswordInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";

const LoginForm = ({ user, onSave, onChange, saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">Login</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="mb-6">
                <EmailInput
                    name="email"
                    label="Email"
                    value={user.email}
                    onChange={onChange}
                    error={errors.email}
                />
            </div>
            <div className="mb-6">
                <PasswordInput
                    name="password"
                    label="Password"
                    value={user.password}
                    onChange={onChange}
                    error={errors.password}
                />
            </div>
            <div className="mb-6">
                <CheckboxInput
                    name="remember_me"
                    label="Remember me?"
                    value={user.remember_me}
                    checked={user.remember_me}
                    onChange={onChange}
                    error={errors.password}

                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="ml-1">{saving ? "Logging in..." : "Log in"}</span>
                </button>
            </div>
        </form>
    );
};

LoginForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default LoginForm;
