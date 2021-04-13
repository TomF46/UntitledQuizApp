const AxiosClient = require("axios");

AxiosClient.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    AxiosClient.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

AxiosClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 403) {
        window.location.assign("/banned");
    }

    return Promise.reject(error);
});

export function attatchBearerToken(token) {
    AxiosClient.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export default AxiosClient;
