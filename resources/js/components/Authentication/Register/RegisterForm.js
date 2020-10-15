import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import EmailInput from "../../FormComponents/EmailInput";
import PasswordInput from "../../FormComponents/PasswordInput";
import { Link } from "react-router-dom";

const RegisterForm = ({
    user,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">Register</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-6">
                <TextInput
                    name="username"
                    label="Username"
                    value={user.username}
                    onChange={onChange}
                    error={errors.username}
                />
            </div>
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
                <PasswordInput
                    name="password_confirmation"
                    label="Password confirmation"
                    value={user.password_confirmation}
                    onChange={onChange}
                    error={errors.password_confirmation}
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                >
                    {saving ? "Registering..." : "Register"}
                </button>
                <Link
                    to={`/login`}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4"
                >
                    To Login
                </Link>
            </div>
        </form>
    );
};

RegisterForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default RegisterForm;
