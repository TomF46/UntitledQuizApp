import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";
import MultiSelectInput from "../../FormComponents/MultiSelectInput";

const QuizForm = ({ quiz, tags, onAddQuestion, onAddAnswer, onSave, onChange, onTagChange, onQuestionChange, onAnswerChange, onAnswerCheckboxChange, onReset, onRemoveQuestion, onRemoveAnswer, saving = false, errors = {} }) => {
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
            <div id="manage-quiz-toolbar" className="p-4 flex border-t justify-between items-center">
                <div className="flex">
                    <button
                        type="button"
                        onClick={onAddQuestion}
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow inline-flex items-center"
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
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow inline-flex items-center"
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
    onAddQuestion: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    onQuestionChange: PropTypes.func.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    onAnswerCheckboxChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onRemoveQuestion: PropTypes.func.isRequired,
    onRemoveAnswer: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default QuizForm;
