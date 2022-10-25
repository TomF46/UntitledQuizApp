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
            <h2 className="font-bold text-primary text-lg mb-4 text-center">Register</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-2">
                <TextInput
                    name="username"
                    label="Username"
                    value={user.username}
                    onChange={onChange}
                    error={errors.username}
                    required={true}
                />
            </div>
            <div className="mb-2">
                <EmailInput
                    name="email"
                    label="Email"
                    value={user.email}
                    onChange={onChange}
                    error={errors.email}
                />
            </div>
            <div className="mb-2">
                <PasswordInput
                    name="password"
                    label="Password"
                    value={user.password}
                    onChange={onChange}
                    error={errors.password}
                />
            </div>
            <div className="mb-4">
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
                    className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{saving ? "Registering..." : "Register"}</span>
                </button>
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
