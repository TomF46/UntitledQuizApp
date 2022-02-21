import axiosClient from "../tools/axiosClient";

export function getFriendsList() {
    return axiosClient
        .get(`/api/friendships`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getFriendRequestsList() {
    return axiosClient
        .get(`/api/friendships/requests`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function removeOrRejectFriend(friendshipId) {
    return axiosClient
        .delete(`/api/friendships/${friendshipId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function acceptFriendRequest(friendshipId) {
    return axiosClient
        .post(`/api/friendships/${friendshipId}/acceptRequest`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
