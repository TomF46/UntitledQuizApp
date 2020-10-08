import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ history }) => {
    return (
        <div className="home-page">
            <p>Hello world</p>
        </div>
    );
};

HomePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default HomePage;
