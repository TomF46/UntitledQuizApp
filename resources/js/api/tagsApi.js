import axiosClient from "../tools/axiosClient";

export function getTags() {
    return axiosClient
        .get(`/api/tags`)
        .then(response => {
             let tags = response.data.map(tag => {
                return {value: tag.id, text: tag.name}
            });
            return tags;
        })
        .catch(error => {
            throw error;
        });
}
