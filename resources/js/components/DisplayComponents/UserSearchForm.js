import React from "react";
import PropTypes from "prop-types";
import TextInput from "../FormComponents/TextInput";

const UserSearchForm = ({ searchTerm, onSearchTermChange }) => {
    return (
        <div>
            <div className="mb-4">
                <TextInput
                    name="searchTerm"
                    label="Search term"
                    value={searchTerm}
                    onChange={onSearchTermChange}
                />
            </div>
        </div>
    );
};

UserSearchForm.propTypes = {
    searchTerm: PropTypes.string,
    onSearchTermChange: PropTypes.func.isRequired
};

export default UserSearchForm;
