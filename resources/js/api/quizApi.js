import axiosClient from "../tools/axiosClient";

export function saveQuiz(quiz) {
    return axiosClient
        .post("/api/quiz", quiz)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuiz(id) {
    return axiosClient
        .get(`/api/quiz/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuizzes() {
    return axiosClient
        .get(`/api/quiz`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function submitScore(quizId, submission){
    return axiosClient
        .post(`/api/quiz/${quizId}/scores`, submission)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getScoresForQuiz(quizId){
    return axiosClient
    .get(`/api/quiz/${quizId}/scores`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}