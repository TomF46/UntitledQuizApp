import axiosClient from "../tools/axiosClient";

export function getCurrentUser() {
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
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

export function getUserForEditing(id) {
    return axiosClient
        .get(`/api/users/${id}/edit`)
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

export function editUserProfile(userId, profile){
    return axiosClient
        .put(`/api/users/${userId}`, profile)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

