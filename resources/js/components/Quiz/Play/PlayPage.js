import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, submitScore } from "../../../api/quizApi";
import QuizPlayForm from "./QuizPlayForm";
import ScoreDetail from "./ScoreDetail";

const QuizPlayPage = ({quizId ,history }) => {
    const [quiz, setQuiz] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null)



    useEffect(() => {
        if(!quiz) {
            getQuiz(quizId).then(quizData => {
                setQuiz(quizData);
                createBlankSubmission(quizData);
            }).catch(error => {
                console.log("Error getting quiz " + error);
            });
        }
    }, [quizId, quiz])

    function createBlankSubmission(quizData){
        let submission = {
            questions: []
        }

        quizData.questions.forEach(question => {
            submission.questions.push({
                id: question.id,
                answer_id: null
            });
        });

        setSubmission({ ...submission});
    }

    function handleAnswerChange(questionId, answerId, e){
        let question = submission.questions.find(question => question.id == questionId);
        question.answer_id = answerId;
        setSubmission({ ...submission});
    
    }

    function handleSubmit(){
        submitScore(quiz.id, submission).then(response => {
            setSubmitted(true);
            setScore({ ...response});
        }).catch(error => {
            console.log("Unable to submit " + error);
        })
    }

    function handleReplay(){
        createBlankSubmission(quiz);
        setSubmitted(false);
        setScore(null);
    }

    return !submission ? (
        <p className="mt-6">... Loading quiz</p>
    ) : (
        !score ? (
            <div className="mt-6">
                <QuizPlayForm quiz={quiz} submission={submission} onAnswerChange={handleAnswerChange} onSubmit={handleSubmit}/>
            </div>
        ) : (
            <div className="mt-6">
                <ScoreDetail score={score} onReplay={handleReplay}/>
            </div>
        )
    )
};

const mapStateToProps = (state, ownProps) => {
    const quizId = ownProps.match.params.quizId;
    return {
      quizId
    };
  };

QuizPlayPage.propTypes = {
    quizId: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPlayPage);

