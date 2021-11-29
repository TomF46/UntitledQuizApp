import React from "react";
import PropTypes from "prop-types";
import TextAreaInput from "../../FormComponents/TextAreaInput"

const CommentForm = ({ comment, onChange, onSubmit, errors = {}, submitting = false }) => {
    return (
        <form className="" onSubmit={onSubmit}>
            {errors.onSubmit && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSubmit}
                </div>
            )}
            <div className="p-4">
                <div>
                    <TextAreaInput
                        name="comment"
                        label="Comment"
                        value={comment}
                        required={true}
                        onChange={onChange}
                        error={errors.comment}
                    />
                </div>
            </div>
            <div id="comments-toolbar" className="px-4 flex flex-col justify-between items-center">
                <div className="flex">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
                <div className="flex">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs p-1 text-center" role="alert">
                            {errors.onSubmit}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    comment: PropTypes.string.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool
};

export default CommentForm;
