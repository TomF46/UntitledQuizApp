import React from "react";
import PropTypes from "prop-types";
import TextAreaInput from "../../FormComponents/TextAreaInput";
import TextInput from "../../FormComponents/TextInput";

const EditProfileForm = ({ user, onChange, onSave, errors = {}, saving = false }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-4xl my-4 text-center">Edit your profile</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="p-4 rounded overflow-hidden shadow-lg card card">
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
            </div>
            <div id="manage-profile-toolbar" className="p-4 rounded overflow-hidden shadow-lg card my-4 flex justify-between items-center">
                <div className="flex">
                </div>
                <div className="flex">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                </div>
                <div className="flex justify-right">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
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
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default EditProfileForm;
