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