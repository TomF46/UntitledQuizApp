import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";

const QuizForm = ({ quiz, onAddQuestion, onAddAnswer , onSave, onChange, onQuestionChange, onAnswerChange, onAnswerCheckboxChange ,saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-4xl my-4 text-center">{quiz.id ? "Edit" : "Add"} Quiz</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSave}
                </div>
            )}
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
            <p>Questions</p>
            {/* Todo sort out error handling for nested items */}
            {quiz.questions.map((row, index) => {
              return (
                  <div className="border-solid border-2 border-gray-600 mb-6 p-2" key={index}>
                    <div className="mb-6">
                        <TextInput
                            name={`questions[${index}].text`}
                            label="Text"
                            value={quiz.questions[index].text}
                            onChange={(e) => onQuestionChange(index, e)}
                        />
                    </div>
                    <p>Answers:</p>
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
                        onChange={(e) => onAnswerCheckboxChange(index, qIndex ,e)}
                    />
                </div>
              )
                    })}
                    <div>
                        <button
                        type="button"
                        onClick={() => onAddAnswer(index)}
                        className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                    >
                        Add Answer
                    </button>
                    </div>
                    {errors.questions[index] && errors.questions[index].error && (
                        <div className="text-red-500 text-xs" role="alert">
                            {errors.questions[index].error}
                        </div>
                    )}
                  </div>
              )
            })}
            {errors.onSave && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="flex justify-center mb-6">
                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                >
                    Add question
                </button>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
};

QuizForm.propTypes = {
    quiz: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onAddQuestion: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onQuestionChange: PropTypes.func.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    onAnswerCheckboxChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default QuizForm;
