import React from "react";
import PropTypes from "prop-types";

const MultiSelectInput = ({ name, label, onChange, placeholder, value, options, error }) => {
    return (
        <div className="field">
            <label
                className="block mb-2 uppercase font-bold text-xs text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="inline-block relative">
                <select
                    multiple
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                        {option.text}
                        </option>
                    );
                    })}
                </select>
                {error && (
                    <div className="text-red-500 text-xs mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

MultiSelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.any),
};

export default MultiSelectInput;
