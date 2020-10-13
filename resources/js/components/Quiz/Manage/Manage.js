import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { newAnswer, newQuestion, newQuiz } from "../../../tools/objectShapes";
import QuizForm from "./QuizForm";
import { saveQuiz } from "../../../api/quizApi";

const QuizManagementPage = ({ history }) => {
    const [quiz, setQuiz] = useState(newQuiz);
    const [errors, setErrors] = useState({});
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
        const { name, value } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[index].answers[answerIndex].is_correct = Boolean(value);
        setQuiz({ ...tempQuiz});
    }

    function formIsValid() {
        const { title, description } = quiz;
        const errors = {};

        setErrors(errors);
        return Object.keys(errors).length === 0;
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
