const newQuiz = {
    id: null,
    title: "",
    description: "",
    tags: [],
    collaborators: [],
    questions: [
        {
            text: "",
            helpText: null,
            answers: [
                {
                    text: "",
                    is_correct: false
                },
                {
                    text: "",
                    is_correct: false
                }
            ],
            image_url: null
        }
    ]
};

const newQuestion = {
    text: "",
    helpText: null,
    answers: [
        {
            text: "",
            is_correct: false
        },
        {
            text: "",
            is_correct: false
        }
    ],
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
