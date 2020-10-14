import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { newAnswer, newQuestion, newQuiz } from "../../../tools/objectShapes";
import QuizForm from "./QuizForm";
import { saveQuiz } from "../../../api/quizApi";
import { error } from "jquery";

const QuizManagementPage = ({ history }) => {
    const [quiz, setQuiz] = useState(newQuiz);
    const [errors, setErrors] = useState({questions: []});
    const [saving, setSaving] = useState(false);

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

        console.log(quiz);

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
            setErrors({ onSave: err.message });
        });
    }

    function handleAddQuestion(){
        let tempQuiz = { ...quiz};
        tempQuiz.questions.push(JSON.parse(JSON.stringify(newQuestion))); // why doesnt deep clone work here to remove references
        setQuiz({ ...tempQuiz});
        let tempErrors = { ...errors};
        tempErrors.questions.push({});
        console.log(tempErrors);
        setErrors({ ...tempErrors});
    }

    function handleAddAnswer(questionIndex){
        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].answers.push(JSON.parse(JSON.stringify(newAnswer)));
        setQuiz({ ...tempQuiz});
    }

    return (
        <div className="quiz-management-page">
            <QuizForm  quiz={quiz}
            errors={errors}
            onAddQuestion={handleAddQuestion}
            onAddAnswer={handleAddAnswer}
            onChange={handleChange}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
            onAnswerCheckboxChange={handleAnswerCheckboxChange}
            onSave={handleSave}
            saving={saving} />
        </div>
    );
};

QuizManagementPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default QuizManagementPage;
