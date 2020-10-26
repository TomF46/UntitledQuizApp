import React from "react";
import PropTypes from "prop-types";
import TextAreaInput from "../../FormComponents/TextAreaInput";
import TextInput from "../../FormComponents/TextInput";
import FileInput from "../../FormComponents/FileInput";

const EditProfileForm = ({ user, onChange, onFileChange, onSave, errors = {}, saving = false }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-4xl my-4 text-center">Edit your profile</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="p-4">
                <div className="mb-6">
                    <TextInput
                        name="username"
                        label="User"
                        value={user.username}
                        onChange={onChange}
                        error={errors.username}
                    />
                </div>
                <div className="mb-6">
                    <TextAreaInput
                        name="bio"
                        label="Bio"
                        value={user.bio}
                        onChange={onChange}
                        error={errors.bio}
                    />
                </div>
                <div className="mb-6 flex flex-col lg:flex-row justify-between">
                    <FileInput
                        label="Profile Image"
                        name="profile_image"
                        onChange={onFileChange}
                        error={errors.profile_image}
                    />
                    <div>
                        <img src={user.profile_image} alt="profile-picture-preview" className="rounded-full profile-photo profile-photo-preview mt-4 lg:mt-0" />
                    </div>
                </div>
            </div>
            <div id="manage-profile-toolbar" className="p-4 my-4 flex justify-between items-center">
                <div className="flex">
                </div>
                <div className="flex">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs p-1" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 shadow"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
};

EditProfileForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default EditProfileForm;
