import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import SelectInput from "../../FormComponents/SelectInput";

const FiltersForm = ({ filters, tags, onFilterChange }) => {
    return (
        <div>
            <div className="mb-4">
                <TextInput
                    name="searchTerm"
                    label="Title"
                    value={filters.searchTerm}
                    onChange={onFilterChange}
                />
            </div>
            <div>
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
