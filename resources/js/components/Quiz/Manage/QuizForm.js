import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";
import CheckboxInput from "../../FormComponents/CheckboxInput";

const QuizForm = ({ quiz, onAddQuestion, onAddAnswer , onSave, onChange, onQuestionChange, onAnswerChange, onAnswerCheckboxChange ,saving = false, errors = {} }) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">{quiz.id ? "Edit" : "Add"} Quiz</h2>
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

            {quiz.questions.map((row, index) => {
              return (
                  <div key={index}>
                    <div className="mb-6">
                        <TextInput
                            name={`questions[${index}].text`}
                            label="Text"
                            value={quiz.questions[index].text}
                            onChange={(e) => onQuestionChange(index, e)}
                            error={quiz.questions[index].text}
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
                        error={quiz.questions[index].text}
                    />
                    <CheckboxInput
                        name={`questions[${index}].answers[${qIndex}].is_correct`}
                        label="Is correct answer?"
                        value={quiz.questions[index].answers[qIndex].is_correct}
                        onChange={(e) => onAnswerCheckboxChange(index, qIndex ,e)}
                        error={errors.active}
                    />
                </div>
              )
                    })}
                    <div>
                        <button
                        type="button"
                        onClick={() => onAddAnswer(index)}
                        className="bg-green-600 text-white rounded py-2 px-4 hover:bg-blue-500"
                    >
                        Add Answer
                    </button>
                    </div>
                  </div>
              )
            })}

            <div className="flex justify-center mb-6">
                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="bg-blue-800 text-white rounded py-2 px-4 hover:bg-blue-500"
                >
                    Add question
                </button>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500"
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
