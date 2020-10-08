import React from "react";
import PropTypes from "prop-types";
import EmailInput from "../../FormComponents/EmailInput";
import PasswordInput from "../../FormComponents/PasswordInput";
import { Link } from "react-router-dom";

const LoginForm = ({ user, onSave, onChange, saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="text-lg">Login</h2>
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
            <button
                type="submit"
                disabled={saving}
                className="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500"
            >
                {saving ? "Logging in..." : "Log in"}
            </button>
            <Link to={`/register`} class="hover:underline ml-4">
                Register
            </Link>
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
