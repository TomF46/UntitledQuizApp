import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import ChallengeInfoPanel from "./ChallegeInfoPanel";

const QuizPlayForm = ({ quiz, submission, challenge, onAnswerChange, currentQuestionNumber, onSubmit, onReset, onNext, onPrevious, errors }) => {
    return (
        <div className="container mx-auto">
            <div className="overflow-hidden shadow page">
                {challenge && (
                    <ChallengeInfoPanel challenge={challenge} />
                )}
                <div className="mt-6">
                    <h1 className="font-bold text-4xl mb-4 text-center">{quiz.title}</h1>
                    <div>
                        {quiz.questions.map((question) => {
                            return (
                                <CSSTransition

                                    key={question.id}
                                    in={question.ordinal + 1 == currentQuestionNumber}
                                    timeout={{ enter: 300, exit: 300 }}
                                    classNames={'fadein'}
                                >
                                    <div>
                                        {question.ordinal + 1 == currentQuestionNumber &&
                                            <div className="p-4">
                                                <p className="text-center font-bold text-xl">Question {question.ordinal + 1} of {quiz.questions.length}</p>
                                                <p className="text-center font-bold text-2xl">{question.text}</p>
                                                {question.image_url &&
                                                    <div>
                                                        <img src={question.image_url} alt="question-image" className="question-image py-16 max-w-xs md:max-w-md lg:max-w-lg" />
                                                    </div>
                                                }
                                                <div className="grid grid-cols-12 mt-4 md:flex-row">
                                                    {quiz.questions[question.ordinal].answers.map((answer) => {
                                                        return (
                                                            <button
                                                                key={answer.id}
                                                                type="button"
                                                                onClick={(e) => onAnswerChange(question.id, answer.id, e)}
                                                                className={`text-white py-3 px-6 hover:bg-green-500 mx-4 my-2 col-span-12 md:col-span-6 shadow 
                                                     ${submission.answers[question.ordinal].answer_id == answer.id ? "bg-green-400" : "bg-gray-800"}`}
                                                            >
                                                                {answer.text}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </CSSTransition>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="play-quiz-toolbar" className="p-4 grid grid-cols-12 shadow card mt-4">
                <div className="col-span-12 md:col-span-4 mb-2 md:mb-0">
                    <button
                        type="button"
                        onClick={onReset}
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 md:mx-4 shadow inline-flex items-center justify-center w-full md:w-auto"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="ml-1">Reset</span>
                    </button>
                </div>
                <div className="col-span-12 md:col-span-4 mb-2 md:mb-0">
                    {errors.incomplete && (
                        <div className="text-red-500 text-xs text-center p-1" role="alert">
                            {errors.incomplete}
                        </div>
                    )}
                    {errors.onSubmit && (
                        <div className="text-red-500 text-xs text-center p-1" role="alert">
                            {errors.onSubmit}
                        </div>
                    )}
                </div>
                <div className="col-span-12 md:col-span-4">
                    <div className="flex flex-col md:flex-row justify-end">
                        {currentQuestionNumber > 1 &&
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="bg-gray-800 text-white rounded py-2 px-4 md:mx-4 mb-2 md:mb-0 hover:bg-gray-600 shadow inline-flex items-center justify-center"
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
                                className="bg-gray-800 text-white rounded py-2 px-4 md:mx-4 mb-2 md:mb-0 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                            >
                                <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="ml-1">Next</span>
                            </button>
                        ) : (
                            <button
                                onClick={onSubmit}
                                className="bg-gray-800 text-white rounded py-2 px-4 md:mx-4 mb-2 md:mb-0 hover:bg-gray-600 shadow justify-center"
                            >
                                Submit
                            </button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

QuizPlayForm.propTypes = {
    quiz: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired,
    challenge: PropTypes.object,
    onAnswerChange: PropTypes.func.isRequired,
    currentQuestionNumber: PropTypes.number.isRequired,
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export default QuizPlayForm;
