import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ history }) => {
    return (
        <div className="home-page">
            <p>Hello world 2</p>
        </div>
    );
};

HomePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default HomePage;
