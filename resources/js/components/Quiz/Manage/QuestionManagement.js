import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";
import * as QuizManagementService from "../../../tools/QuizManagementService";
import { confirmAlert } from "react-confirm-alert";

const QuestionManagement = ({ quiz, updateQuiz, updateErrors, errors = {} }) => {

    function onAddAnswer(questionIndex) {
        updateQuiz(QuizManagementService.addBlankAnswerToQuestion(quiz, questionIndex));
    }

    function onQuestionChange(questionIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeQuestionText(quiz, questionIndex, value));
    }

    function onAnswerChange(questionIndex, answerIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeAnswerText(quiz, questionIndex, answerIndex, value));
    }

    function onAnswerCheckboxChange(questionIndex, answerIndex, event) {
        const { checked } = event.target;
        updateQuiz(QuizManagementService.setIsCorrectForAnswer(quiz, questionIndex, answerIndex, checked));
    }

    function onRemoveQuestion(questionIndex) {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this question?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        updateQuiz(QuizManagementService.removeQuestion(quiz, questionIndex));
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }

    function onRemoveAnswer(questionIndex, answerIndex) {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this answer?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        updateQuiz(QuizManagementService.removeAnswer(quiz, questionIndex, answerIndex));
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }


    return (
        <>
            {quiz.questions.length > 0 && <h2 className="font-bold border-t text-3xl py-4 text-center">Questions</h2>}
            {quiz.questions.map((question, questionIndex) => {
                return (
                    <div className="p-4 mb-6 border-t" key={question.id ? question.id : questionIndex}>
                        <h3 className="font-bold text-xl">Question {questionIndex + 1}</h3>
                        <div className="mb-6">
                            <TextInput
                                name={`questions[${questionIndex}].text`}
                                label="Text"
                                value={quiz.questions[questionIndex].text}
                                onChange={(e) => onQuestionChange(questionIndex, e)}
                            />
                        </div>
                        {quiz.questions[questionIndex].answers.length > 0 && <h2 className="font-bold text-lg my-2">Answers:</h2>}
                        {quiz.questions[questionIndex].answers.map((answer, answerIndex) => {
                            return (
                                <div className="mb-6" key={answer.id ? answer.id : answerIndex}>
                                    <TextInput
                                        name={`questions[${questionIndex}].answers[${answerIndex}].text`}
                                        label="Text"
                                        value={quiz.questions[questionIndex].answers[answerIndex].text}
                                        onChange={(e) => onAnswerChange(questionIndex, answerIndex, e)}
                                    />
                                    <CheckboxInput
                                        name={`questions[${questionIndex}].answers[${answerIndex}].is_correct`}
                                        label="Is correct answer?"
                                        value={quiz.questions[questionIndex].answers[answerIndex].is_correct}
                                        checked={quiz.questions[questionIndex].answers[answerIndex].is_correct}
                                        onChange={(e) => onAnswerCheckboxChange(questionIndex, answerIndex, e)}
                                    />
                                    <p className="block text-red-400 font-bold pointer" onClick={() => onRemoveAnswer(questionIndex, answerIndex)}>Remove Answer</p>
                                </div>
                            )
                        })}
                        {errors.questions[questionIndex] && errors.questions[questionIndex].error && (
                            <div className="text-red-500 text-xs p-1" role="alert">
                                {errors.questions[questionIndex].error}
                            </div>
                        )}
                        <div id="manage-question-toolbar" className="flex justify-between  items-center">
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={() => onAddAnswer(questionIndex)}
                                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1">Add Answer</span>
                                </button>
                            </div>
                            <div className="flex justify-right">
                                <button
                                    type="button"
                                    onClick={() => onRemoveQuestion(questionIndex)}
                                    className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1">Remove Question</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

QuestionManagement.propTypes = {
    quiz: PropTypes.object.isRequired,
    errors: PropTypes.object,
    updateQuiz: PropTypes.func.isRequired,
    updateErrors: PropTypes.func.isRequired,
};

export default QuestionManagement;
