const newQuiz = {
    id: null,
    title: "",
    description: "",
    tags: [],
    questions: []
};

const newQuestion = {
    text: "",
    answers: [],
    image_url: null
}

const newAnswer = {
    text: "",
    is_correct: false
}

const newTag = {
    id: null,
    name: ""
}

module.exports = {
    newQuiz,
    newQuestion,
    newAnswer,
    newTag
};
