import React from "react";
import PropTypes from "prop-types";
import EmailInput from "../../FormComponents/EmailInput";
import PasswordInput from "../../FormComponents/PasswordInput";
import { Link } from "react-router-dom";
import CheckboxInput from "../../FormComponents/CheckboxInput";

const LoginForm = ({ user, onSave, onChange, saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">Login</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
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
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                >
                    {saving ? "Logging in..." : "Log in"}
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
