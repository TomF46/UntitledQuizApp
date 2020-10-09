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

export function attatchBearerToken(token) {
    AxiosClient.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export default AxiosClient;
