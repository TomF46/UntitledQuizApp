import React from "react";
import PropTypes from "prop-types";

const QuizPlayForm = ({ quiz, submission, onAnswerChange, currentQuestionNumber, onSubmit, onReset, onNext, onPrevious, errors }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-4xl mb-4 text-center">{quiz.title}</h1>
            <div>
                {quiz.questions.map((question) => {
                    return (
                    <>
                        {question.ordinal + 1 == currentQuestionNumber && 
                        <div className="p-4" key={question.id}>
                            <p className="text-center font-bold text-2xl">{question.ordinal + 1}: {question.text}</p>
                            <div className="flex">
                            {quiz.questions[question.ordinal].answers.map((answer) => {
                                return (
                                    <button
                                        key={answer.id}
                                        type="button"
                                        onClick={(e) => onAnswerChange(question.id, answer.id ,e)}
                                        className={`text-white py-2 px-4 hover:bg-green-500 mr-2 my-12 flex-1 shadow 
                                        ${submission.questions[question.ordinal].answer_id == answer.id  ? "bg-green-400" : "bg-purple-400"}`}
                                    >
                                        {answer.text}
                                    </button>
                                )
                            })}
                            </div>
                        </div>
                        }
                    </>
                    )
                })}
            </div>
            <div id="play-quiz-toolbar" className="p-4 flex justify-between items-center">
                <div className="flex">
                     <button
                        type="button"
                        onClick={onReset}
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 mr-2 shadow"
                    >
                        Reset
                    </button>
                </div>
                <div className="flex">
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
                </div>
                <div className="flex justify-right">
                    {currentQuestionNumber > 1 && 
                        <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow"
                        >
                            Previous
                        </button>
                    }
                    {currentQuestionNumber != quiz.questions.length ? ( 
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow"
                        >
                            Next
                        </button>
                        ) : (
                            <button
                                onClick={onSubmit}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow"
                            >
                                Submit
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

QuizPlayForm.propTypes = {
    quiz: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    currentQuestionNumber: PropTypes.number.isRequired,
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,

};

export default QuizPlayForm;
