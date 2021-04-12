
import axiosClient from "../tools/axiosClient";

export function saveTag(tag) {
    return tag.id ? editTag(tag) : createTag(tag)
}

function editTag(tag) {
    return axiosClient
        .put(`/api/tags/${tag.id}`, tag)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

function createTag(tag) {
    return axiosClient
        .post('/api/tags', tag)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
export function getTags() {
    return axiosClient
        .get('/api/tags')
        .then(response => {
            let tags = response.data.map(tag => {
                return { value: tag.id, text: tag.name }
            });
            return tags;
        })
        .catch(error => {
            throw error;
        });
}

export function getTagsPaginated() {
    return getTagsWithUrl(`/api/tags?`);
}

export function getTagsWithUrl(url) {
    return axiosClient
        .get(`${url}&paginated=true`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getTag(id) {
    return axiosClient
        .get(`/api/tags/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function deleteTag(id) {
    return axiosClient
        .delete(`/api/tags/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

