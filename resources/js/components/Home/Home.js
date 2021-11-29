import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomePage = ({ history }) => {
    return (
        <div className="home-page">
            <h1 className="font-bold text-primary text-6xl text-white logo">
                <Link to="login">
                    Untitled Quiz App.... Enter
                </Link>
            </h1>
        </div>
    );
};

HomePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default HomePage;
