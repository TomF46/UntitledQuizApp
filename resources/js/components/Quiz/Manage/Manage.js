import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newAnswer, newQuestion, newQuiz } from "../../../tools/objectShapes";
import QuizForm from "./QuizForm";
import { getQuizForEdit, saveQuiz } from "../../../api/quizApi";
import { Redirect } from "react-router-dom";
import { getTags } from "../../../api/tagsApi";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const QuizManagementPage = ({ quizId, userId ,history }) => {
    const [quiz, setQuiz] = useState(newQuiz);
    const [tags, setTags] = useState(null);
    const [errors, setErrors] = useState({questions: []});
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (quizId) {
          getQuizForEdit(quizId).then(data => {
            data.tags = data.tags.map(tag => {
                return {value: tag.id, text: tag.name}
            });
            setQuiz({ ...data})
            setLoaded(true);
          }).catch(error => {
              toast.error("Error fetching quiz to edit " + error.message,{
                    autoClose: false,
                });
          })
        } else {
          setQuiz({ ...newQuiz})
          setLoaded(true);
        }
      }, [quizId]);

      useEffect(() => {
        if (!tags) {
          getTags().then(tags => {
              setTags(tags)
          });
        }
      }, tags);

    function handleChange(event) {
        const { name, value } = event.target;

        setQuiz(prevQuiz => ({
            ...prevQuiz,
            [name]: value
        }));
    }

    function handleTagChange(selected){
        setQuiz(prevQuiz => ({
            ...prevQuiz,
            'tags': selected
        }));
    }

    function handleQuestionChange(questionIndex,event) {
        const { name, value } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].text = value;
        setQuiz({ ...tempQuiz});
    }

    function handleAnswerChange(index, answerIndex, event) {
        const { name, value } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[index].answers[answerIndex].text = value;
        setQuiz({ ...tempQuiz});
    }

    function handleAnswerCheckboxChange(index, answerIndex, event) {
        const { name, checked } = event.target;

        let tempQuiz = { ...quiz};
        tempQuiz.questions[index].answers.forEach(answer => {
            answer.is_correct = false;
        });
        tempQuiz.questions[index].answers[answerIndex].is_correct = Boolean(checked);
        setQuiz({ ...tempQuiz});
    }

    function formIsValid() {
        const { title, description } = quiz;
        const errors = {questions: []};
        let isValid = true;

        if (!title){
            errors.title = "Title is required";
            isValid = false;
        }
        if (!description){
            errors.title = "Title is required";
            isValid = false;
        }

        quiz.questions.forEach((question, index) => {
            let questionErrorMessage = "";
            errors.questions.push({});
            if(question.answers.length < 2) questionErrorMessage =`${questionErrorMessage} A question must have at least 2 answers.`; 

            let correctAnswers = 0;
            question.answers.forEach((answer) => {
                if(answer.is_correct) correctAnswers++;
            });

            if(correctAnswers != 1) questionErrorMessage =`${questionErrorMessage} One answer must be set as the correct answer.`; 

            if(questionErrorMessage){
                errors.questions[index].error = questionErrorMessage;
                isValid = false;
            }
        });

        setErrors({ ...errors});
        return isValid;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        let quizToPost = { ...quiz};

        quizToPost.tags = quizToPost.tags.map(tag => tag.value);

        saveQuiz(quizToPost).then(response => {
            toast.success("Quiz saved");
            history.push(`/quiz/${response.id}`);
        })
        .catch(err => {
            setSaving(false);
            toast.error("Error saving quiz",{
                autoClose: false,
            });
            let tempErrors = { ...errors};
            tempErrors.onSave = err.message;
            setErrors({... tempErrors});
        });
    }

    function handleAddQuestion(){
        let tempQuiz = { ...quiz};
        tempQuiz.questions.push(JSON.parse(JSON.stringify(newQuestion))); // why doesnt deep clone work here to remove references
        setQuiz({ ...tempQuiz});
        let tempErrors = { ...errors};
        tempErrors.questions.push({});
        setErrors({ ...tempErrors});
    }

    function handleAddAnswer(questionIndex){
        let tempQuiz = { ...quiz};
        tempQuiz.questions[questionIndex].answers.push(JSON.parse(JSON.stringify(newAnswer)));
        setQuiz({ ...tempQuiz});
    }

    function handleReset(){
        confirmAlert({
            title: "Confirm reset",
            message: `Are you sure you want to rest?`,
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                    let replacementQuiz = { ...newQuiz};
                    replacementQuiz.questions = [];
                    setQuiz({ ...replacementQuiz});
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
          });
    }

    function handleRemoveQuestion(questionIndex){
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this question?`,
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                    let tempQuiz = { ...quiz};
                    tempQuiz.questions.splice(questionIndex, 1);
                    setQuiz({ ...tempQuiz});
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
          });
    }

    function handleRemoveAnswer(questionIndex, answerIndex)
    {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this answer?`,
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                    let tempQuiz = { ...quiz};
                    tempQuiz.questions[questionIndex].answers.splice(answerIndex, 1);
                    setQuiz({ ...tempQuiz});
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
        });
    }

    return (
        <div className="quiz-management-page overflow-hidden shadow-lg page">
            {quiz.creator_id && quiz.creator_id != userId &&  <Redirect to="/" />}
            {!loaded ? (
                <LoadingMessage message={'Loading form'} />
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
                saving={saving} />
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
    const quizId = ownProps.match.params.quizId;
    const userId = state.tokens.user_id;
    return {
      quizId,
      userId
    };
  };
  
  export default connect(mapStateToProps)(QuizManagementPage);
  
