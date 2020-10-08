export function Login(userLoginDetails) {
    return axios
        .post("/api/auth/login", userLoginDetails)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function Register(userRegistrationDetails) {
    return axios
        .post("/api/auth/register", userRegistrationDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error;
        });
}
