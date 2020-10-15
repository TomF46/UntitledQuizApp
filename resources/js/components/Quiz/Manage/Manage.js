import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newAnswer, newQuestion, newQuiz } from "../../../tools/objectShapes";
import QuizForm from "./QuizForm";
import { getQuiz, saveQuiz } from "../../../api/quizApi";
import { Redirect } from "react-router-dom";

const QuizManagementPage = ({ quizId, userId ,history }) => {
    const [quiz, setQuiz] = useState(newQuiz);
    const [errors, setErrors] = useState({questions: []});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (quizId) {
          getQuiz(quizId).then(data => {
            setQuiz({ ...data})
          }).catch(error => {
              console.log(error);
          })
        } else {
          setQuiz({ ...newQuiz})
        }
      }, [quizId]);

    function handleChange(event) {
        const { name, value } = event.target;

        setQuiz(prevQuiz => ({
            ...prevQuiz,
            [name]: value
        }));
    }

    function handleQuestionChange(questionIndex,event) {
        const { name, value } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].text = value;
        setQuiz({ ...tempQuiz});
    }

    function handleAnswerChange(index, answerIndex, event) {
        const { name, value } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[index].answers[answerIndex].text = value;
        setQuiz({ ...tempQuiz});
    }

    function handleAnswerCheckboxChange(index, answerIndex, event) {
        const { name, checked } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[index].answers.forEach(answer => {
            answer.is_correct = false;
        });
        tempQuiz.questions[index].answers[answerIndex].is_correct = Boolean(checked);
        setQuiz({ ...tempQuiz});
    }

    function formIsValid() {
        const { title, description } = quiz;
        const errors = {questions: []};
        let isValid = true;

        if (!title){
            errors.title = "Title is required";
            isValid = false;
        }
        if (!description){
            errors.title = "Title is required";
            isValid = false;
        }

        quiz.questions.forEach((question, index) => {
            let questionErrorMessage = "";
            errors.questions.push({});
            if(question.answers.length < 2) questionErrorMessage =`${questionErrorMessage} A question must have at least 2 answers.`; 

            let correctAnswers = 0;
            question.answers.forEach((answer) => {
                if(answer.is_correct) correctAnswers++;
            });

            if(correctAnswers != 1) questionErrorMessage =`${questionErrorMessage} One answer must be set as the correct answer.`; 

            if(questionErrorMessage){
                errors.questions[index].error = questionErrorMessage;
                isValid = false;
            }
        });

        setErrors({ ...errors});
        return isValid;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        saveQuiz(quiz).then(response => {
            history.push(`/quiz/${response.id}`);
        })
        .catch(err => {
            console.log(err);
            setSaving(false);
            let tempErrors = { ...errors};
            tempErrors.onSave = err.message;
            setErrors({... tempErrors});
        });
    }

    function handleAddQuestion(){
        let tempQuiz = { ...quiz};
        tempQuiz.questions.push(JSON.parse(JSON.stringify(newQuestion))); // why doesnt deep clone work here to remove references
        setQuiz({ ...tempQuiz});
        let tempErrors = { ...errors};
        tempErrors.questions.push({});
        setErrors({ ...tempErrors});
    }

    function handleAddAnswer(questionIndex){
        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].answers.push(JSON.parse(JSON.stringify(newAnswer)));
        setQuiz({ ...tempQuiz});
    }

    function handleReset(){
        //confirm
        let replacementQuiz = { ...newQuiz};
        replacementQuiz.questions = [];
        setQuiz({ ...replacementQuiz});
    }

    function handleRemoveQuestion(questionIndex){
        //confirm
        let tempQuiz = { ...quiz};
        tempQuiz.questions.splice(questionIndex, 1);
        setQuiz({ ...tempQuiz});
    }

    function handleRemoveAnswer(questionIndex, answerIndex)
    {
        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].answers.splice(answerIndex, 1);
        setQuiz({ ...tempQuiz});
    }

    return (
        <div className="quiz-management-page">
            {quiz.creator_id && quiz.creator_id != userId &&  <Redirect to="/" />}
            <QuizForm  quiz={quiz}
            errors={errors}
            onAddQuestion={handleAddQuestion}
            onAddAnswer={handleAddAnswer}
            onChange={handleChange}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
            onAnswerCheckboxChange={handleAnswerCheckboxChange}
            onReset={handleReset}
            onSave={handleSave}
            onRemoveQuestion={handleRemoveQuestion}
            onRemoveAnswer={handleRemoveAnswer}
            saving={saving} />
        </div>
    );
};

QuizManagementPage.propTypes = {
    quizId: PropTypes.any,
    userId: PropTypes.any,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const quizId = ownProps.match.params.quizId;
    const userId = state.tokens.user_id;
    return {
      quizId,
      userId
    };
  };
  
  export default connect(mapStateToProps)(QuizManagementPage);
  
