import axiosClient from "../tools/axiosClient";

export function getCurrentUser() {
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUserById(id) {
    return axiosClient
        .get(`/api/users/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getScoresForUser(id) {
    return axiosClient
        .get(`/api/users/${id}/scores`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
