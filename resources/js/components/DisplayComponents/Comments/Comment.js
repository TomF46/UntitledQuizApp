import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import history from "../../../history";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import { editComment } from "../../../api/quizApi";

const Comment = ({ comment, onDeleteComment, onReload }) => {
    const [updatedComment, setUpdatedComment] = useState(comment.text);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function viewUser() {
        if (comment.user_id) history.push(`/profile/${comment.user_id}`);
    }

    function handleCommentChange(event) {
        const { name, value } = event.target;
        setUpdatedComment(value);
    }

    function commentIsValid() {
        const errors = {};
        if (!comment) errors.comment = "Comment text is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleCommentSubmit(event) {
        event.preventDefault();
        if (!commentIsValid()) return;
        setSubmitting(true);

        let payload = {
            "id": comment.id,
            "text": updatedComment
        };

        editComment(payload).then(response => {
            toast.success("Comment updated");
            onReload();
            setSubmitting(false);
            setEditing(false);
        })
            .catch(err => {
                setSubmitting(false);
                toast.error("Error updating comment", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
            });
    }

    return (
        <div className="grid grid-cols-12 mb border-b py-4">
            <div className="col-span-12 lg:col-span-2">
                <div className="flex flex-row">
                    <div className="flex">
                        <img src={comment.user_img} onClick={viewUser} alt="profile-picture" className={`rounded-full h-12 w-12 ${comment.user_id ? 'pointer' : ''}`} />
                    </div>
                    <div className="flex ml-2">
                        <div className="flex flex-col">
                            <div className={`flex ${comment.user_id ? 'pointer text-secondary font-bold' : ''}`} onClick={viewUser}>{comment.username}</div>
                            <div className="flex text-xs"><Moment format="DD/MM/YYYY h:mm:ss a">{comment.updated_at}</Moment></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-8 px-4 border-l border-r">{editing ? (
                <CommentForm comment={updatedComment} onChange={handleCommentChange} onSubmit={handleCommentSubmit} submitting={submitting} errors={errors} />
            ) : (
                <p>{comment.text}</p>
            )}</div>
            <div className="col-span-12 lg:col-span-2 px-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
                        {comment.canEdit && (
                            <div onClick={() => setEditing(!editing)} className="inline-flex items-center justify-center pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${editing ? 'text-danger' : 'text-secondary'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                {editing && (
                                    <span className="ml-1 text-danger font-bold">Cancel Editing</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
                        {comment.canDelete && (
                            <svg onClick={() => onDeleteComment(comment.id)} xmlns="http://www.w3.org/2000/svg" className="text-danger h-6 w-6 pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired
};

export default Comment;
