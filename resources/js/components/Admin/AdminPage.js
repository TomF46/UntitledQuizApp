import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminPage = ({ history }) => {
    return (
        <div className="admin-page">
            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow page">
                    <h1 className="font-bold text-primary text-primary text-4xl my-4 text-center">Admin controls</h1>
                    <p className="text-center my-4 font-bold">Actions</p>
                    <div className="flex flex-col justify-center">
                        <Link to="/admin/users" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mb-2 inline-flex items-center justify-center hover:opacity-75 hover:text-secondary  shadow">
                            <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="ml-1">Users</span>
                        </Link>
                        <Link to="/admin/tags" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mb-2 inline-flex items-center justify-center hover:opacity-75 hover:text-secondary  shadow">
                            <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="ml-1">Tags</span>
                        </Link>
                        <Link to="/admin/bans/quizzes" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 inline-flex items-center justify-center hover:opacity-75 hover:text-secondary  shadow">
                            <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                            <span className="ml-1">Banned Quizzes</span></Link>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 overflow-hidden shadow page">

                </div>
            </div>
        </div>
    );
};

AdminPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default AdminPage;
