import axiosClient from "../tools/axiosClient";

export function getCurrentUser() {
    console.log("In get current user");
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            console.log(response);
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
