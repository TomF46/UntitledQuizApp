import axiosClient from '../tools/axiosClient';

export function login(userLoginDetails) {
  return axiosClient
    .post('/api/auth/login', userLoginDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function register(userRegistrationDetails) {
  return axiosClient
    .post('/api/auth/register', userRegistrationDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
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
