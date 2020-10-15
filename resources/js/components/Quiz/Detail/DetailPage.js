import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, getScoresForQuiz } from "../../../api/quizApi";
import QuizDetail from "./QuizDetail";
import { error } from "jquery";

const QuizDetailPage = ({quizId ,history }) => {
    const [quiz, setQuiz] = useState(null);
    const [scores, setScores] = useState([]);


    useEffect(() => {
        if(!quiz) {
            getQuiz(quizId).then(quizData => {
                setQuiz(quizData);
                getScores(quizData.id);
            }).catch(error => {
                console.log("Error getting quiz " + error);
            });
        }
    }, [quizId, quiz])

    function getScores(id){
        getScoresForQuiz(id).then(scores => {
            setScores(scores);
        }).catch(error => {
            console.log("Error getting scores " + error);
        });
    }
    

    return !quiz ? (
        <p className="mt-6">... Loading quiz</p>
    ) : (
        <div className="mt-6">
            <QuizDetail quiz={quiz} scores={scores} />
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

