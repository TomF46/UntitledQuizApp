const AxiosClient = require('axios');

AxiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  AxiosClient.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

AxiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      window.location.assign('/banned');
    }
    if (error.response.status === 404) {
      window.location.assign('/404');
    }

    return Promise.reject(error);
  },
);

export function attatchBearerToken(token) {
  AxiosClient.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export default AxiosClient;
