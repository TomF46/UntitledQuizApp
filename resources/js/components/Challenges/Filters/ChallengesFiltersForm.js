import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";

const ChallengesFiltersForm = ({ filters, onFilterChange }) => {
    return (
        <div>
            <div className="mb-4">
                <TextInput
                    name="quizName"
                    label="Quiz Name"
                    value={filters.quizName}
                    onChange={onFilterChange}
                    required={false}
                />
            </div>
            <div className="mb-4">
                <TextInput
                    name="user"
                    label="User"
                    value={filters.user}
                    onChange={onFilterChange}
                    required={false}
                />
            </div>
        </div>
    );
};

ChallengesFiltersForm.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default ChallengesFiltersForm;
