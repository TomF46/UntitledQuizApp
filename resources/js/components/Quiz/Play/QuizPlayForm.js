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
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 mr-2 shadow inline-flex items-center"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="ml-1">Reset</span>
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
                        className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow inline-flex items-center"
                        >
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                            <span className="ml-1">Previous</span>
                        </button>
                    }
                    {currentQuestionNumber != quiz.questions.length ? ( 
                        <button
                            type="button"
                            onClick={onNext}
                            className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow inline-flex items-center"
                        >
                            <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-1">Next</span>
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
