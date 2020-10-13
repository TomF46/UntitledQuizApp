import React from "react";
import PropTypes from "prop-types";

const QuizPlayPage = ({ history }) => {
    return (
        <div className="quiz-play-page">
            <p>Quiz Play Page</p>
        </div>
    );
};

QuizPlayPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default QuizPlayPage;
