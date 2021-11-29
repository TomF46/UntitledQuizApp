import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";
import * as QuizManagementService from "../../../tools/QuizManagementService";
import { confirmAlert } from "react-confirm-alert";
import { storeImage } from "../../../api/imagesApi";
import { toast } from "react-toastify";

const QuestionManagement = ({ quiz, updateQuiz, errors = {}, setIsUpploadingImage }) => {

    function onAddAnswer(questionIndex) {
        updateQuiz(QuizManagementService.addBlankAnswerToQuestion(quiz, questionIndex));
    }

    function onQuestionChange(questionIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeQuestionText(quiz, questionIndex, value));
    }

    function onQuestionHelpTextChange(questionIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeQuestionHelpText(quiz, questionIndex, value));
    }

    function onAnswerChange(questionIndex, answerIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeAnswerText(quiz, questionIndex, answerIndex, value));
    }

    function onAnswerCheckboxChange(questionIndex, answerIndex, event) {
        const { checked } = event.target;
        updateQuiz(QuizManagementService.setIsCorrectForAnswer(quiz, questionIndex, answerIndex, checked));
    }

    function onQuestionImageChange(questionIndex, event) {
        let file = event.target.files[0];

        setIsUpploadingImage(true);
        toast.info("Uploading image");
        storeImage(file).then(res => {
            setIsUpploadingImage(false);
            toast.success("Sucessfully uploaded image");
            updateQuiz(QuizManagementService.changeQuestionImage(quiz, questionIndex, res.path));
        }).catch(error => {
            setIsUpploadingImage(false);
            toast.error("Unable to uploaded image");
        });
    }

    function onRemoveImage(questionIndex) {
        updateQuiz(QuizManagementService.changeQuestionImage(quiz, questionIndex, null));
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
            {quiz.questions.map((question, questionIndex) => {
                return (
                    <div className="p-4 shadow card mt-4" key={question.id ? question.id : questionIndex}>
                        <h3 className="font-bold text-primary text-xl">Question {questionIndex + 1}</h3>
                        <div className="mb-1">
                            <TextInput
                                name={`questions[${questionIndex}].text`}
                                label="Text"
                                value={quiz.questions[questionIndex].text}
                                onChange={(e) => onQuestionChange(questionIndex, e)}
                                required={true}
                            />
                        </div>
                        <div className="mb-1">
                            <TextInput
                                name={`questions[${questionIndex}].helpText`}
                                label="Help text"
                                value={quiz.questions[questionIndex].helpText}
                                onChange={(e) => onQuestionHelpTextChange(questionIndex, e)}
                                required={false}
                            />
                        </div>
                        <div>
                            {quiz.questions[questionIndex].image_url != null ? (
                                <div>
                                    <img src={quiz.questions[questionIndex].image_url} alt="image-preview" className="question-image-preview mt-4" />
                                    <p className="text-red-400 font-bold pointer inline hover:text-red-500" onClick={() => onRemoveImage(questionIndex)}>Remove image</p>
                                </div>
                            ) : (
                                <label className="pointer inline text-gray-600 font-bold hover:text-gray-800 pb-4">
                                    Add image
                                    <input
                                        type="file"
                                        name={`questions[${questionIndex}].image_url`}
                                        className=" border-gray-400 p-2 w-full hidden"
                                        onChange={(e) => onQuestionImageChange(questionIndex, e)}

                                    />
                                </label>
                            )}
                        </div>
                        {quiz.questions[questionIndex].answers.length > 0 && <h2 className="font-bold text-primary text-lg my-2">Answers:</h2>}
                        {quiz.questions[questionIndex].answers.map((answer, answerIndex) => {
                            return (
                                <div className="mb-6" key={answer.id ? answer.id : answerIndex}>
                                    <TextInput
                                        name={`questions[${questionIndex}].answers[${answerIndex}].text`}
                                        label="Text"
                                        value={quiz.questions[questionIndex].answers[answerIndex].text}
                                        onChange={(e) => onAnswerChange(questionIndex, answerIndex, e)}
                                        required={true}
                                    />
                                    <div className="flex justify-between">
                                        <div>
                                            <CheckboxInput
                                                name={`questions[${questionIndex}].answers[${answerIndex}].is_correct`}
                                                label="Is correct answer?"
                                                value={quiz.questions[questionIndex].answers[answerIndex].is_correct}
                                                checked={quiz.questions[questionIndex].answers[answerIndex].is_correct}
                                                onChange={(e) => onAnswerCheckboxChange(questionIndex, answerIndex, e)}
                                            />
                                        </div>
                                        <div>
                                            <p className="inline text-red-400 font-bold pointer hover:text-red-500" onClick={() => onRemoveAnswer(questionIndex, answerIndex)}>Remove Answer</p>
                                        </div>
                                    </div>
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
                                    className="bg-primary  text-white rounded py-2 px-4 mt-4 hover:opacity-75 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1">Answer</span>
                                </button>
                            </div>
                            <div className="flex justify-end mt-auto">
                                <button
                                    type="button"
                                    onClick={() => onRemoveQuestion(questionIndex)}
                                    className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
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
    setIsUpploadingImage: PropTypes.func.isRequired
};

export default QuestionManagement;
