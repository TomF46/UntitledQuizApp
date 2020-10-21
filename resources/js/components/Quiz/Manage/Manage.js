import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newQuiz } from "../../../tools/objectShapes";
import QuizForm from "./QuizForm";
import { getQuizForEdit, saveQuiz } from "../../../api/quizApi";
import { Redirect } from "react-router-dom";
import { getTags } from "../../../api/tagsApi";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import * as QuizManagementService from "../../../tools/QuizManagementService";
const QuizManagementPage = ({ quizId, userId, history }) => {
    const [quiz, setQuiz] = useState(newQuiz);
    const [tags, setTags] = useState(null);
    const [errors, setErrors] = useState({ questions: [] });
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (quizId) {
            getQuizForEdit(quizId)
                .then(data => {
                    setQuiz({ ...data });
                    setLoaded(true);
                })
                .catch(error => {
                    toast.error(
                        "Error fetching quiz to edit " + error.message,
                        {
                            autoClose: false
                        }
                    );
                });
        } else {
            setQuiz({ ...newQuiz });
            setLoaded(true);
        }
    }, [quizId]);

    useEffect(() => {
        if (!tags) {
            getTags().then(tags => {
                setTags(tags);
            });
        }
    }, [tags]);

    function handleChange(event) {
        const { name, value } = event.target;
        setQuiz({ ...QuizManagementService.updateQuiz(quiz, name, value) });
    }

    function handleTagChange(selected) {
        setQuiz({ ...QuizManagementService.updateTags(quiz, selected) });
    }

    function handleQuestionChange(questionIndex, event) {
        const { value } = event.target;
        setQuiz({ ...QuizManagementService.changeQuestionText(quiz, questionIndex, value) });
    }

    function handleAnswerChange(questionIndex, answerIndex, event) {
        const { value } = event.target;
        setQuiz({ ...QuizManagementService.changeAnswerText(quiz, questionIndex, answerIndex, value) });
    }

    function handleAnswerCheckboxChange(questionIndex, answerIndex, event) {
        const { checked } = event.target;
        setQuiz({ ...QuizManagementService.setIsCorrectForAnswer(quiz, questionIndex, answerIndex, checked) });
    }

    function formIsValid() {
        var validated = QuizManagementService.validateQuiz(quiz);
        setErrors({ ...validated.errors });
        return validated.isValid;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        let quizToPost = { ...quiz };

        quizToPost.tags = quizToPost.tags.map(tag => tag.value);

        saveQuiz(quizToPost)
            .then(response => {
                toast.success("Quiz saved");
                history.push(`/quiz/${response.id}`);
            })
            .catch(err => {
                setSaving(false);
                toast.error("Error saving quiz", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
            });
    }

    function handleAddQuestion() {
        setQuiz({ ...QuizManagementService.addBlankQuestion(quiz) });
        setErrors({ ...QuizManagementService.addBlankErrorsForQuestion(errors) });
    }

    function handleAddAnswer(questionIndex) {
        setQuiz({ ...QuizManagementService.addBlankAnswerToQuestion(quiz, questionIndex) });
    }

    function handleReset() {
        confirmAlert({
            title: "Confirm reset",
            message: `Are you sure you want to reset?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setQuiz({ ...QuizManagementService.resetQuiz(quiz) });
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }

    function handleRemoveQuestion(questionIndex) {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this question?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setQuiz({ ...QuizManagementService.removeQuestion(quiz, questionIndex) });
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }

    function handleRemoveAnswer(questionIndex, answerIndex) {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this answer?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setQuiz({ ...QuizManagementService.removeAnswer(quiz, questionIndex, answerIndex) });
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
        <div className="quiz-management-page shadow-lg page">
            {quiz.creator_id && quiz.creator_id != userId && (
                <Redirect to="/" />
            )}
            {!loaded ? (
                <LoadingMessage message={"Loading form"} />
            ) : (
                    <QuizForm
                        quiz={quiz}
                        tags={tags}
                        errors={errors}
                        onAddQuestion={handleAddQuestion}
                        onAddAnswer={handleAddAnswer}
                        onChange={handleChange}
                        onTagChange={handleTagChange}
                        onQuestionChange={handleQuestionChange}
                        onAnswerChange={handleAnswerChange}
                        onAnswerCheckboxChange={handleAnswerCheckboxChange}
                        onReset={handleReset}
                        onSave={handleSave}
                        onRemoveQuestion={handleRemoveQuestion}
                        onRemoveAnswer={handleRemoveAnswer}
                        saving={saving}
                    />
                )}
        </div>
    );
};

QuizManagementPage.propTypes = {
    quizId: PropTypes.any,
    userId: PropTypes.any,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        quizId: ownProps.match.params.quizId,
        userId: state.tokens.user_id
    };
};

export default connect(mapStateToProps)(QuizManagementPage);
