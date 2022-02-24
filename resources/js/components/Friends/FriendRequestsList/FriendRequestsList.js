import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const FriendRequestsList = ({ requests, onAccept, onRemove }) => {
    return (
        <div>
            {requests.map((request) => {
                return (
                    <div key={request.id} className="grid grid-cols-12  px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-4 md:col-span-2 text-center md:text-left">
                            <p className="text-sm text-gray-600">Sender:</p>
                            <Link className="font-medium items-center pointer" to={`/profile/${request.sender.id}`}>{request.sender.username}</Link>
                        </div>
                        <div className="col-span-4 md:col-span-2 text-center md:text-left">
                            <p className="text-sm text-gray-600">Recipient:</p>
                            <Link className="font-medium items-center pointer" to={`/profile/${request.recipient.id}`}>{request.recipient.username}</Link>
                        </div>
                        <div className="hidden md:block col-span-4 text-center md:text-left">
                            <p className="text-sm text-gray-600">Sent:</p>
                            <p><Moment format="DD/MM/YYYY h:mm:ss a">{request.date}</Moment></p>
                        </div>
                        {request.canAnswer ? (
                            <>
                                <div className="col-span-2">
                                    <button
                                        onClick={() => { onAccept(request.id) }}
                                        className="bg-secondary text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center justify-center"
                                    >
                                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="ml-1">Accept</span>
                                    </button>
                                </div>
                                <div className="col-span-2">
                                    <button
                                        onClick={() => { onRemove(request.id) }}
                                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center justify-center "
                                    >
                                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                        <span className="ml-1">Reject</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-4 text-center md:text-left">
                                <p className="text-sm text-gray-600">Status:</p>
                                <p>Waiting for response</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

FriendRequestsList.propTypes = {
    requests: PropTypes.array.isRequired,
    onAccept: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default FriendRequestsList;
