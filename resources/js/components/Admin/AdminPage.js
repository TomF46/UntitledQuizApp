import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminPage = ({ history }) => {
    return (
        <div className="admin-page">
            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 px-4 overflow-hidden shadow-lg page">
                    <h1 className="font-bold text-4xl my-4 text-center">Admin controls</h1>
                    <p className="text-center my-4 font-bold">Actions</p>
                    <div className="flex flex-col justify-center">
                        <Link to="/admin/tags" className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 hover:text-white shadow">Tags</Link>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 overflow-hidden shadow-lg page">

                </div>
            </div>
        </div>

    );
};

AdminPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default AdminPage;
