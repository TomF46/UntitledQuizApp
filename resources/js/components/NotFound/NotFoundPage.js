import React from "react";
import PropTypes from "prop-types";

const NotFoundPage = ({ history }) => {
    return (
        <div className="NotFound-page">
            <h1 className="font-bold text-4xl text-center">Not found</h1>
            <p className="text-center">The page you are looking for does not or no longer exists.</p>
        </div>
    );
};

NotFoundPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default NotFoundPage;
