import React from "react";
import PropTypes from "prop-types";

const QuizPlayForm = ({ quiz, submission, onAnswerChange, onSubmit, errors }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-2xl mb-4 text-center">{quiz.title}</h1>
            <div>
                {quiz.questions.map((question) => {
                    return (
                    <div className="mb-4" key={question.id}>
                        <p>{question.ordinal + 1}: {question.text}</p>
                        <div className="flex">
                        {quiz.questions[question.ordinal].answers.map((answer) => {
                            return (
                                <button
                                    key={answer.id}
                                    type="button"
                                    onClick={(e) => onAnswerChange(question.id, answer.id ,e)}
                                    className={`text-white py-2 px-4 hover:bg-green-500 mr-2 
                                    ${submission.questions[question.ordinal].answer_id == answer.id  ? "bg-green-400" : "bg-purple-400"}`}
                                >
                                    {answer.text}
                                </button>
                            )
                        })}
                        </div>
                    </div>
                    )
                })}
            </div>
            {errors.incomplete && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.incomplete}
                </div>
            )}
            {errors.onSubmit && (
                <div className="text-red-500 text-xs" role="alert">
                    {errors.onSubmit}
                </div>
            )}
            <div className="flex justify-center">
                <button
                    onClick={onSubmit}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

QuizPlayForm.propTypes = {
    quiz: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default QuizPlayForm;
