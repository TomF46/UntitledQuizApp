import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ userIsAuthenticated }) => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    Untitled Quiz App
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white">
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/quiz"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                            >
                                Create
                            </Link>
                            <Link
                                to="/explore"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
                            >
                                Explore
                            </Link>
                        </>
                    )}
                </div>
                <div>
                    {!userIsAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white mt-4 lg:mt-0 inline-flex items-center mr-2"
                            >
                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white mt-4 lg:mt-0 inline-flex items-center"
                            >
                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="ml-1">Register</span>
                            </Link>
                        </>
                    )}
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/profile"
                                className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:shadow mt-4 lg:mt-0 inline-flex items-center"
                            >
                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="ml-1">Profile</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(Header);
