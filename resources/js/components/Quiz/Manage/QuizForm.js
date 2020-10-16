import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";
import SelectInput from "../../FormComponents/SelectInput";
import MultiSelectInput from "../../FormComponents/MultiSelectInput";

const QuizForm = ({ quiz, tags, onAddQuestion, onAddAnswer , onSave, onChange, onTagChange , onQuestionChange, onAnswerChange, onAnswerCheckboxChange, onReset, onRemoveQuestion, onRemoveAnswer ,saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-4xl my-4 text-center">{quiz.id ? "Edit" : "Add"} Quiz</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="p-4 rounded shadow-lg card overflow-visible">
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
            {quiz.questions.length > 0 &&  <h2 className="font-bold text-3xl my-4 text-center">Questions</h2>}
            {/* Todo sort out error handling for nested items */}
            {quiz.questions.map((row, index) => {
              return (
                  <div className="p-4 rounded overflow-hidden shadow-lg card card mb-6" key={index}>
                    <h3 className="font-bold text-xl">Question {index + 1}</h3>
                    <div className="mb-6">
                        <TextInput
                            name={`questions[${index}].text`}
                            label="Text"
                            value={quiz.questions[index].text}
                            onChange={(e) => onQuestionChange(index, e)}
                        />
                    </div>
                    {quiz.questions[index].answers.length > 0 &&  <h2 className="font-bold text-lg my-2">Answers:</h2>}
                    {quiz.questions[index].answers.map((row, qIndex) => {
              return (
                <div className="mb-6">
                    <TextInput
                        name={`questions[${index}].answers[${qIndex}].text`}
                        label="Text"
                        value={quiz.questions[index].answers[qIndex].text}
                        onChange={(e) => onAnswerChange(index, qIndex ,e)}
                    />
                        <CheckboxInput
                            name={`questions[${index}].answers[${qIndex}].is_correct`}
                            label="Is correct answer?"
                            value={quiz.questions[index].answers[qIndex].is_correct}
                            checked={quiz.questions[index].answers[qIndex].is_correct}
                            onChange={(e) => onAnswerCheckboxChange(index, qIndex ,e)}
                        />
                        <p className="block text-red-400 font-bold pointer" onClick={() => onRemoveAnswer(index, qIndex)}>Remove Answer</p>
                </div>
              )
                    })}
                    {errors.questions[index] && errors.questions[index].error && (
                        <div className="text-red-500 text-xs" role="alert">
                            {errors.questions[index].error}
                        </div>
                    )}
                    <div id="manage-question-toolbar" className="flex justify-between items-center">
                        <div className="flex">
                            <button
                                type="button"
                                onClick={() => onAddAnswer(index)}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                            >
                                Add Answer
                            </button>
                        </div>
                        <div className="flex justify-right">
                        <button
                            type="button"
                            onClick={() => onRemoveQuestion(index)}
                            className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500"
                        >
                            Remove question
                        </button>
                        </div>
                    </div>
                  </div>
              )
            })}
            <div id="manage-quiz-toolbar" className="p-4 rounded overflow-hidden shadow-lg card my-4 flex justify-between items-center">
                <div className="flex">
                    <button
                        type="button"
                        onClick={onAddQuestion}
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                    >
                        Add question
                    </button>
                </div>
                <div className="flex">
                    {errors.onSave && (
                        <div className="text-red-500 text-xs" role="alert">
                            {errors.onSave}
                        </div>
                    )}
                </div>
                <div className="flex justify-right">
                    <button
                        type="button"
                        onClick={onReset}
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 mr-2"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                    >
                        {saving ? "Saving..." : "Save"}
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
