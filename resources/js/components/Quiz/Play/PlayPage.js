import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuiz, submitScore } from "../../../api/quizApi";
import QuizPlayForm from "./QuizPlayForm";
import ScoreDetail from "./ScoreDetail";
import { error } from "jquery";

const QuizPlayPage = ({quizId ,history }) => {
    const [quiz, setQuiz] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null)
    const [errors, setErrors] = useState({});



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

    function submissionIsValid() {
        const errors = {};

        var emptyAnswers = submission.questions.filter(question => question.answer_id == null);
        if(emptyAnswers.length > 0) errors.incomplete = "Submission is incomplete not all questions have an answer set."
        if(submission.questions.length != quiz.questions.length) errors.onSubmit = "Error collating quiz submission."

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(){
        if (!submissionIsValid()) return;

        submitScore(quiz.id, submission).then(response => {
            setSubmitted(true);
            setScore({ ...response});
        }).catch(error => {
            console.log("Unable to submit " + error);
            setErrors({ onSubmit: error.message });
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
                <QuizPlayForm quiz={quiz} submission={submission} onAnswerChange={handleAnswerChange} onSubmit={handleSubmit} errors={errors}/>
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
