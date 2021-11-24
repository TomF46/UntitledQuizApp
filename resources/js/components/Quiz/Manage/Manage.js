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
import _ from 'lodash';

const QuizManagementPage = ({ quizId, userId, history }) => {
    const [quiz, setQuiz] = useState({ ...newQuiz });
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
                    toast.error(`Error fetching quiz to edit ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setQuiz(_.cloneDeep(newQuiz));
            updateErrors(QuizManagementService.addBlankErrorsForQuestion(errors));
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

    function updateQuiz(quiz) {
        setQuiz({ ...quiz });
    }

    function updateErrors(errors) {
        setErrors({ ...errors });
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

    return (
        <div className="quiz-management-page container mx-auto">
            {quiz.creator && quiz.creator.id != userId && (
                <Redirect to="/" />
            )}
            {!loaded ? (
                <div className="shadow page">
                    <LoadingMessage message={"Loading form"} />
                </div>
            ) : (
                <QuizForm
                    quiz={quiz}
                    tags={tags}
                    errors={errors}
                    updateQuiz={updateQuiz}
                    updateErrors={updateErrors}
                    onReset={handleReset}
                    onSave={handleSave}
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
