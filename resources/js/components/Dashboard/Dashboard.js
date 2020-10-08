import React from "react";
import PropTypes from "prop-types";

const DashboardPage = ({ history }) => {
    return (
        <div className="dashboard-page">
            <p>Dashboard</p>
        </div>
    );
};

DashboardPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default DashboardPage;
