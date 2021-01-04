import React from "react";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
    return (
        <div className="grid grid-cols-12 mb border-b">
            <div className="col-span-12 lg:col-span-3 p-4">
                <div className="flex flex-row">
                    <div className="flex">
                        <img src={comment.user_img} alt="profile-picture" className="rounded-full h-12 w-12" />
                    </div>
                    <div className="flex items-center ml-2">{comment.username}</div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-9 p-4">{comment.text}</div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
