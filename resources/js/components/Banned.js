import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authenticationActions";
import { toast } from "react-toastify";

const BannedPage = ({ history}) => {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        toast.info("Logged out.");
        history.push("/login")
    }

    return (
        <div className="Banned-page">
            <h1 className="font-bold text-primary text-primary text-4xl text-center">You're Banned</h1>
            <p className="text-center">Contact an administrator to find out why and work to resolving the issue</p>
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-primary  text-white text-center rounded py-2 px-4 mt-4 hover:opacity-75 shadow inline-flex items-center justify-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="ml-1">Logout</span>
                </button>
            </div>
        </div >
    );
};

BannedPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default BannedPage;

