import React from "react";
import PropTypes from "prop-types";

const QuizDetailPage = ({ history }) => {
    return (
        <div className="quiz-detail-page">
            <p>Quiz Detail Page</p>
        </div>
    );
};

QuizDetailPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default QuizDetailPage;
