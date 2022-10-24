import { newAnswer, newQuestion, newQuiz } from "./objectShapes";
import _ from 'lodash';

export function validateQuiz(quiz) {
    const errors = { questions: [] };
    let isValid = true;

    if (!quiz.title) {
        errors.title = "Title is required";
        isValid = false;
    }
    if (!quiz.description) {
        errors.description = "Description is required";
        isValid = false;
    }

    quiz.questions.forEach((question, index) => {
        let questionErrorMessage = "";
        errors.questions.push({});
        if (question.answers.length < 2)
            questionErrorMessage = `${questionErrorMessage} A question must have at least 2 answers.`;

        let correctAnswers = 0;
        question.answers.forEach(answer => {
            if (answer.is_correct) correctAnswers++;
        });

        if (correctAnswers != 1)
            questionErrorMessage = `${questionErrorMessage} One answer must be set as the correct answer.`;

        if (questionErrorMessage) {
            errors.questions[index].error = questionErrorMessage;
            isValid = false;
        }
    });

    if (quiz.questions.length == 0) {
        errors.onSave = "Quizzes must have at least 1 question";
        isValid = false;
    }

    return {
        isValid: isValid,
        errors: errors
    };
}

export function addBlankQuestion(quiz) {
    quiz.questions.push(_.cloneDeep(newQuestion));
    return quiz;
}

export function addBlankErrorsForQuestion(errors) {
    errors.questions.push({});
    return errors;
}

export function addBlankAnswerToQuestion(quiz, questionIndex) {
    quiz.questions[questionIndex].answers.push(_.cloneDeep(newAnswer));
    return quiz;
}

export function setIsCorrectForAnswer(quiz, questionIndex, answerIndex, correct) {
    quiz.questions[questionIndex].answers.forEach(answer => {
        answer.is_correct = false;
    });
    quiz.questions[questionIndex].answers[answerIndex].is_correct = Boolean(
        correct
    );
    return quiz;
}

export function changeQuestionText(quiz, questionIndex, value) {
    quiz.questions[questionIndex].text = value;
    return quiz;
}

export function changeQuestionHelpText(quiz, questionIndex, value) {
    quiz.questions[questionIndex].helpText = value;
    return quiz;
}

export function changeQuestionImage(quiz, questionIndex, path) {
    quiz.questions[questionIndex].image_url = path;
    return quiz;
}

export function changeQuestionVideo(quiz, questionIndex, path) {
    quiz.questions[questionIndex].video_url = path;
    return quiz;
}

export function changeAnswerText(quiz, questionIndex, answerIndex, value) {
    quiz.questions[questionIndex].answers[answerIndex].text = value;
    return quiz;
}

export function updateTags(quiz, tags) {
    quiz.tags = tags;
    return quiz;
}

export function updateCollaborators(quiz, collaborators) {
    quiz.collaborators = collaborators;
    return quiz;
}

export function updateQuiz(quiz, name, value) {
    quiz[name] = value;
    return quiz;
}

export function resetQuiz(quiz) {
    quiz = { ...newQuiz };
    quiz.questions = [];
    return quiz;
}

export function removeQuestion(quiz, questionIndex) {
    quiz.questions.splice(questionIndex, 1);
    return quiz;
}

export function removeAnswer(quiz, questionIndex, answerIndex) {
    quiz.questions[questionIndex].answers.splice(answerIndex, 1);
    return quiz;
}