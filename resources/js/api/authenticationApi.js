import axiosClient from "../tools/axiosClient";

export function Login(userLoginDetails) {
    return axiosClient
        .post("/api/auth/login", userLoginDetails)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function Register(userRegistrationDetails) {
    return axiosClient
        .post("/api/auth/register", userRegistrationDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error;
        });
}
