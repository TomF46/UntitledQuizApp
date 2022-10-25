import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";
import * as QuizManagementService from "../../../tools/QuizManagementService";
import { confirmAlert } from "react-confirm-alert";
import { storeImage } from "../../../api/imagesApi";
import { toast } from "react-toastify";
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '60%',
    },
};

Modal.setAppElement('#index');

const QuestionManagement = ({ quiz, updateQuiz, errors = {}, setIsUpploadingImage }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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

    function onQuestionVideoChange(questionIndex, event) {
        const { value } = event.target;
        updateQuiz(QuizManagementService.changeQuestionVideo(quiz, questionIndex, value));
    }

    function onQuestionVideoRemoved(questionIndex) {
        updateQuiz(QuizManagementService.changeQuestionVideo(quiz, questionIndex, null));
        closeModal();
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
                        <div>
                            <TextInput
                                name={`questions[${questionIndex}].helpText`}
                                label="Help text"
                                value={quiz.questions[questionIndex].helpText}
                                onChange={(e) => onQuestionHelpTextChange(questionIndex, e)}
                                required={false}
                            />
                        </div>
                        <div className="flex mt-2">
                            <div>
                                {quiz.questions[questionIndex].image_url != null ? (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveImage(questionIndex)}
                                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                                    >Remove image</button>
                                ) : (
                                    <button type="button" className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>

                                        <label className="pointer ml-1">
                                            Add Image
                                            <input
                                                type="file"
                                                name={`questions[${questionIndex}].image_url`}
                                                className=" border-gray-400 p-2 w-full hidden"
                                                onChange={(e) => onQuestionImageChange(questionIndex, e)}

                                            />
                                        </label>
                                    </button>
                                )}
                            </div>
                            <div>
                                <button type="button" onClick={openModal} className="bg-primary text-white rounded py-2 px-4 ml-2 hover:opacity-75 shadow inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    <span className="ml-1">{question.video_url ? "Manage Video" : "Add Video"}</span>
                                </button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12">
                                            <h3 className="font-bold text-center">Manage video</h3>
                                        </div>
                                        <div className="col-span-12">
                                            <p>Please add a valid embed link for your video on your format of choice in the input below, if you add a valid link then a preview of the video will appear below.</p><br />
                                            <p>Example links include</p>
                                            <ul>
                                                <li>Youtube: https://www.youtube.com/embed/5mGuCdlCcNM</li>
                                                <li>Vimeo: https://player.vimeo.com/video/759911151</li>
                                            </ul>
                                        </div>
                                        <div className="col-span-12 mt-4">
                                            <TextInput
                                                name={`questions[${questionIndex}].video_url`}
                                                label="Video URL"
                                                value={quiz.questions[questionIndex].video_url}
                                                onChange={(e) => onQuestionVideoChange(questionIndex, e)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-span-12 mt-4">
                                            <p className="text-center font-bold">Preview</p>
                                            <div className="video-container grid grid-cols-12 justify-center">
                                                <iframe className="video col-span-12 lg:col-start-4 lg:col-span-6" src={question.video_url} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                        <div className="col-span-12 text-right">
                                            <button
                                                type="button"
                                                onClick={() => { onQuestionVideoRemoved(questionIndex) }}
                                                className="bg-red-400 text-white rounded py-2 px-4 mt-4 hover:opacity-75 shadow inline-flex items-center">
                                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="ml-1">Remove Question</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="bg-primary text-white rounded py-2 px-4 mt-4 ml-2 hover:opacity-75 shadow inline-flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                                <span className="ml-1">Finish</span>
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        {quiz.questions[questionIndex].image_url != null && (
                            <img src={quiz.questions[questionIndex].image_url} alt="image-preview" className="question-image-preview mt-4" />
                        )}
                        {quiz.questions[questionIndex].video_url != null && (
                            <div className="video-container grid grid-cols-12">
                                <iframe className="video col-span-12 lg:col-start-4 lg:col-span-6" src={question.video_url} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        )}
                        {quiz.questions[questionIndex].answers.length > 0 && <h2 className="font-bold text-primary text-lg mt-2">Answers:</h2>}
                        {quiz.questions[questionIndex].answers.map((answer, answerIndex) => {
                            return (
                                <div className="mb-2" key={answer.id ? answer.id : answerIndex}>
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
                                            <p className="inline text-red-400 font-bold text-sm pointer hover:text-red-500" onClick={() => onRemoveAnswer(questionIndex, answerIndex)}>Remove Answer</p>
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
                                    <span className="ml-1">Add Answer</span>
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
    setIsUpploadingImage: PropTypes.func.isRequired
};

export default QuestionManagement;
