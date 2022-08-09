import React from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import history from "../../../history";

const Comment = ({ comment, onDeleteComment }) => {

    function viewUser() {
        if (comment.user_id) history.push(`/profile/${comment.user_id}`);
    }

    return (
        <div className="grid grid-cols-12 mb border-b">
            <div className="col-span-12 lg:col-span-3 p-4">
                <div className="flex flex-row">
                    <div className="flex">
                        <img src={comment.user_img} onClick={viewUser} alt="profile-picture" className={`rounded-full h-12 w-12 ${comment.user_id ? 'pointer' : ''}`} />
                    </div>
                    <div className="flex ml-2">
                        <div className="flex flex-col">
                            <div className={`flex ${comment.user_id ? 'pointer' : ''}`} onClick={viewUser}>{comment.username}</div>
                            <div className="flex text-xs"><Moment format="DD/MM/YYYY h:mm:ss a">{comment.created_at}</Moment></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-7 p-4">{comment.text}</div>
            <div className="col-span-12 lg:col-span-2 p-4">
                {comment.canManage && (
                    <div className="row">
                        <div className="col-span-6"></div>
                        <div className="col-span-6">
                            <svg onClick={() => onDeleteComment(comment.id)} xmlns="http://www.w3.org/2000/svg" className="text-danger h-6 w-6 pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></div>
                    </div>
                )}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired
};

export default Comment;
