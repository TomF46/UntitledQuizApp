import axiosClient from "../tools/axiosClient";

export function searchChallenges(filters) {
    return axiosClient
        .post(`/api/challenges/search`, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchChallengesWithPagination(url, filters) {
    return axiosClient
        .post(url, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getActiveChallenges() {
    return axiosClient
        .get(`/api/challenges`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getActiveChallengesWithPaginator(url) {
    return axiosClient
        .post(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}