import React from "react";
import PropTypes from "prop-types";

const NotFoundPage = ({ history }) => {
    return (
        <div className="NotFound-page">
            <p>NotFound</p>
        </div>
    );
};

NotFoundPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default NotFoundPage;
