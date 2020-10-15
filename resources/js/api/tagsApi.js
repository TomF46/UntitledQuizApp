import axiosClient from "../tools/axiosClient";

export function getTags() {
    return axiosClient
        .get(`/api/tags`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
