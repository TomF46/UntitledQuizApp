import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const FriendsList = ({ friends, onRemove }) => {
    return (
        <div>
            {friends.map((friend) => {
                return (
                    <div key={friend.id} className="grid grid-cols-12  px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-4 text-center md:text-left">
                            <p className="text-sm text-gray-600">Friend:</p>
                            <Link className="font-medium items-center pointer" to={`/profile/${friend.userId}`}>{friend.username}</Link>
                        </div>
                        <div className="col-span-4 text-center md:text-left">
                            <p className="text-sm text-gray-600">Since:</p>
                            <p><Moment format="DD/MM/YYYY h:mm:ss a">{friend.date}</Moment></p>
                        </div>
                        <div className="col-span-4 flex justify-center my-2 sm:my-0">
                            <div className="table vertical-centered">
                                <button
                                    onClick={() => { onRemove(friend.id) }}
                                    className="bg-red-400  text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center ml-2"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    <p className="ml-1">Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FriendsList.propTypes = {
    friends: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default FriendsList;
