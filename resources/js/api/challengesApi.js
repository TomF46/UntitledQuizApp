import axiosClient from "../tools/axiosClient";

export function getChallenge(id) {
    return axiosClient
        .get(`/api/challenges/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function sendChallenge(recipientId, scoreId) {
    return axiosClient
        .post(`/api/challenges`, { "recipient_id": recipientId, "score_id": scoreId })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

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

export function getChallengePointsLeaderboard() {
    return axiosClient
        .get(`/api/challenges/leaderboard`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}