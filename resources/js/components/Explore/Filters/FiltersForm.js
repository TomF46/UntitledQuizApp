import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import SelectInput from "../../FormComponents/SelectInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";

const FiltersForm = ({ filters, tags, onFilterChange }) => {
    return (
        <div>
            <div className="mb-2">
                <TextInput
                    name="searchTerm"
                    label="Title"
                    value={filters.searchTerm}
                    onChange={onFilterChange}
                    required={false}
                />
            </div>
            <div className="mb-2">
                <TextInput
                    name="user"
                    label="User"
                    value={filters.user}
                    onChange={onFilterChange}
                    required={false}
                />
            </div>
            <div className="mb-2">
                <SelectInput
                    name="tag"
                    label="Tag"
                    defaultText="All tags"
                    value={filters.tag}
                    options={tags}
                    onChange={onFilterChange}
                />
            </div>
            <div>
                <CheckboxInput
                    name="onlyShowRecommended"
                    label="Only show QuizApp recommended"
                    value={filters.onlyShowRecommended}
                    checked={filters.onlyShowRecommended}
                    onChange={onFilterChange}
                />
            </div>
        </div>
    );
};

FiltersForm.propTypes = {
    filters: PropTypes.object.isRequired,
    tags: PropTypes.array,
    onFilterChange: PropTypes.func.isRequired
};

export default FiltersForm;
