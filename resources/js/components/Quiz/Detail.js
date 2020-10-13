import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz } from "../../api/quizApi";

const QuizDetailPage = ({quizId ,history }) => {
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        if(!quiz) {
            getQuiz(quizId).then(quizData => {
                setQuiz(quizData);
            }).catch(error => {
                console.log("Error getting quiz " + error);
            });
        }
    }, [quizId, quiz])

    return !quiz ? (
        <p>... Loading quiz</p>
    ) : (
        <div>
            <p>Detail for quiz</p>
            <p>{quiz.title}</p>
            <p>{quiz.description}</p>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    const quizId = ownProps.match.params.quizId;
    return {
      quizId
    };
  };

QuizDetailPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetailPage);

