import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="grid grid-cols-12 px-4 py-2 border-b overflow-hidden">
                        <div className="col-span-1 inline-flex items-center">
                            <img src="https://picsum.photos/200" alt="profile-picture" className="rounded-full h-12 w-12" />
                        </div>
                        <div className="col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <h3 className="font-bold text-lg items-center">{user.username}</h3>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Quizzes created:</p>
                            <p>{user.totalQuizzesCreated}</p>
                        </div>
                        <div className="col-span-2 inline-flex items-center">
                            <svg className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <p className="ml-1">{user.followerCount} followers</p>
                        </div>
                        <div className="col-span-3 flex justify-end mb-2">
                            <Link
                                to={`/profiles/${user.id}`}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 inline-block align-middle shadow"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UsersList;
