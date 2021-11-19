import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";

const TagManagementForm = ({
    tag,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {

    return (
        <form onSubmit={onSave}>
            <div className="shadow page">

                <h2 className="font-bold text-4xl py-4 text-center">{tag.id ? "Edit" : "Add"} Tag</h2>
                <div className="p-4">
                    <div className="mb-6">
                        <TextInput
                            name="name"
                            label="Name"
                            value={tag.name}
                            onChange={onChange}
                            error={errors.name}
                            required={true}
                        />
                    </div>
                </div>
            </div>
            <div id="manage-tag-toolbar" className="p-4 grid grid-cols-12 shadow card mt-4">
                <div className="col-span-12 md:col-span-4 mb-2 md:mb-0">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs text-center p-1" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                </div>
                <div className="col-span-12 md:col-span-8">
                    <div className="flex flex-col md:flex-row justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gray-800 text-white rounded text-center py-2 px-4 hover:bg-gray-600 shadow inline-flex items-right"
                        >
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

TagManagementForm.propTypes = {
    tag: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    saving: PropTypes.bool
};

export default TagManagementForm;
