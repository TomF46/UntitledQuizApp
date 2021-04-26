import axiosClient from "../tools/axiosClient";

export function getBan(id) {
    return axiosClient
        .get(`/api/bans/quizzes/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}