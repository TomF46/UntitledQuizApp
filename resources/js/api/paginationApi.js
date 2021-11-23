import axiosClient from "../tools/axiosClient";

export function getPageWithPaginationUrl(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}