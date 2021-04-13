import axiosClient from "../tools/axiosClient";

export function getUsers() {
    return axiosClient
        .get("/api/users")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchUsers(searchTerm) {
    return axiosClient
        .post(`/api/users/search`, { searchTerm: searchTerm })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUsersPage(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchUsersWithPage(url, searchTerm) {
    return axiosClient
        .post(url, { searchTerm: searchTerm })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


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
export function getScoresWithPaginator(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


export function editUserProfile(userId, profile) {
    return axiosClient
        .put(`/api/users/${userId}`, profile)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function followUser(userId) {
    return axiosClient
        .post(`/api/users/${userId}/follow`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getFollowedUsers() {
    return axiosClient
        .get('/api/dashboard/users/followed')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUsersWithPaginator(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUserIsAdmin() {
    return axiosClient
        .get('/api/me/isAdmin')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

