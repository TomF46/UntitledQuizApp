import React from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'multiselect-react-dropdown';

const MultiSelectInput = ({ name, label, onChange, placeholder, value, options, error }) => {
    return (
        <div className="field">
            <label
                className="block mb-2 font-bold text-xs text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <div>
                <Multiselect
                    displayValue="text"
                    options={options}
                    selectedValues={value}
                    onSelect={onChange}
                    onRemove={onChange}
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
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
