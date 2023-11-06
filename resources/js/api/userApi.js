import axiosClient from '../tools/axiosClient';

export function searchUsers(searchTerm) {
  return axiosClient
    .post(`/api/users/search`, { searchTerm: searchTerm })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getCurrentUser() {
  return axiosClient
    .get('/api/auth/user')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUserById(id) {
  return axiosClient
    .get(`/api/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUserForEditing(id) {
  return axiosClient
    .get(`/api/users/${id}/edit`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getScoresForUser(id) {
  return axiosClient
    .get(`/api/users/${id}/scores`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function editUserProfile(userId, profile) {
  return axiosClient
    .put(`/api/users/${userId}`, profile)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function followUser(userId) {
  return axiosClient
    .post(`/api/users/${userId}/follow`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getFollowedUsers() {
  return axiosClient
    .get('/api/dashboard/users/followed')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUserIsAdmin() {
  return axiosClient
    .get('/api/me/isAdmin')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function toggleBan(id, isBanned) {
  return isBanned ? unbanUser(id) : banUser(id);
}

function unbanUser(id) {
  return axiosClient
    .post(`/api/users/${id}/unban`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function banUser(id) {
  return axiosClient
    .post(`/api/users/${id}/ban`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function friendRequest(id) {
  return axiosClient
    .post(`/api/users/${id}/friendRequest`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function downloadUsersCSV() {
  return axiosClient
    .get('/api/users/downloads/all')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
