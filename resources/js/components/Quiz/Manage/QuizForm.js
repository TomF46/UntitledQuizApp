import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import MultiSelectInput from "../../FormComponents/MultiSelectInput";
import * as QuizManagementService from "../../../tools/QuizManagementService";
import QuestionManagement from "./QuestionManagement";

const QuizForm = ({ quiz, tags, updateQuiz, updateErrors, onSave, onReset, saving = false, errors = {} }) => {

    function onAddQuestion() {
        updateQuiz(QuizManagementService.addBlankQuestion(quiz));
        updateErrors(QuizManagementService.addBlankErrorsForQuestion(errors));
    }

    function onChange(event) {
        const { name, value } = event.target;
        updateQuiz(QuizManagementService.updateQuiz(quiz, name, value));
    }

    function onTagChange(selected) {
        updateQuiz(QuizManagementService.updateTags(quiz, selected));
    }

    return (
        <form onSubmit={onSave}>
            <h2 className="font-bold text-4xl py-4 text-center">{quiz.id ? "Edit" : "Add"} Quiz</h2>
            <div className="p-4">
                <div className="mb-6">
                    <TextInput
                        name="title"
                        label="Title"
                        value={quiz.title}
                        onChange={onChange}
                        error={errors.title}
                    />
                </div>
                <div className="mb-6">
                    <TextInput
                        name="description"
                        label="Description"
                        value={quiz.description}
                        onChange={onChange}
                        error={errors.description}
                    />
                </div>
                {tags && tags.length > 0 && (
                    <div className="mb-6">
                        <MultiSelectInput
                            name="tags"
                            label="Tags"
                            value={quiz.tags}
                            options={tags}
                            onChange={onTagChange}
                            error={errors.tags}
                        />
                    </div>
                )}
            </div>
            <QuestionManagement quiz={quiz} updateQuiz={updateQuiz} updateErrors={updateErrors} errors={errors} />
            <div id="manage-quiz-toolbar" className="p-4 flex border-t justify-between items-center">
                <div className="flex">
                    <button
                        type="button"
                        onClick={onAddQuestion}
                        className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="ml-1">Add Question</span>
                    </button>
                </div>
                <div className="flex">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs p-1" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                </div>
                <div className="flex justify-right">
                    <button
                        type="button"
                        onClick={onReset}
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 mr-2 shadow inline-flex items-center"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="ml-1">Reset</span>
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

QuizForm.propTypes = {
    quiz: PropTypes.object.isRequired,
    tags: PropTypes.array,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    updateQuiz: PropTypes.func.isRequired,
    updateErrors: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default QuizForm;
