import React from "react";
import PropTypes from "prop-types";

const EmailInput = ({ name, label, onChange, placeholder, value, error }) => {
    return (
        <div className="field">
            <label
                className="block mb-2 font-bold text-xs text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="control">
                <input
                    type="email"
                    name={name}
                    className="border border-gray-400 p-2 w-full"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

EmailInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default EmailInput;
