const newQuiz = {
    id: null,
    title: "",
    description: "",
    tags : [],
    questions: []
};

const newQuestion = {
    text: "",
    answers: []
}

const newAnswer = {
    text: "",
    is_correct: false
}

module.exports = {
    newQuiz,
    newQuestion,
    newAnswer
  };
  