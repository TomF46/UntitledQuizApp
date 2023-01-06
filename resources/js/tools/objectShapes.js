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
            image_url: null,
            video_url: null
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
    image_url: null,
    video_url: null
}

const newAnswer = {
    text: "",
    is_correct: false
}

const newTag = {
    id: null,
    name: ""
}

const newEvent = {
   name: "",
   description: "",
   universal: false,
   tags: [],
   score_group_1: 0,
   score_group_2: 0,
   score_group_3: 0,
   score_group_4: 0,
   score_max: 0,
}

module.exports = {
    newQuiz,
    newQuestion,
    newAnswer,
    newTag,
    newEvent
};
