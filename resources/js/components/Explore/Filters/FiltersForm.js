import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import SelectInput from "../../FormComponents/SelectInput";

const FiltersForm = ({ filters, tags, onFilterChange }) => {
    return (
        <div className="border-b p-4 grid grid-cols-3">
            <div className="p-1">
                <TextInput
                    name="searchTerm"
                    label="Search"
                    value={filters.searchTerm}
                    onChange={onFilterChange}
                />
            </div>
            <div></div>
            <div className="p-1">
                <SelectInput
                    name="tag"
                    label="Tag"
                    value={filters.tag}
                    options={tags}
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
