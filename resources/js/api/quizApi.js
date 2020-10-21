import axiosClient from "../tools/axiosClient";

export function saveQuiz(quiz) {
    return quiz.id ? editQuiz(quiz) : createQuiz(quiz);
}

function editQuiz(quiz){
    return axiosClient
        .put(`/api/quizzes/${quiz.id}`, quiz)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

function createQuiz(quiz){
    return axiosClient
        .post('/api/quizzes', quiz)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuiz(id) {
    return axiosClient
        .get(`/api/quizzes/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuizForEdit(id) {
    return axiosClient
        .get(`/api/quizzes/${id}/edit`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuizzes() {
    return axiosClient
        .get(`/api/quizzes`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuizzesWithPagination(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchQuizzesWithPagination(url, filters) {
    return axiosClient
        .post(url, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getQuizzesByUserFollowing(){
    return axiosClient
        .get('/api/dashboard/quizzes/followed')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getMostPopularQuizzes(){
    return axiosClient
        .get('/api/dashboard/quizzes/popular')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


export function submitScore(quizId, submission){
    return axiosClient
        .post(`/api/quizzes/${quizId}/scores`, submission)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getScoresForQuiz(quizId){
    return axiosClient
    .get(`/api/quizzes/${quizId}/scores`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

export function deleteQuiz(quizId){
    return axiosClient
    .delete(`/api/quizzes/${quizId}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

export function getQuizzesByUser(userId){
    return axiosClient
    .get(`/api/users/${userId}/quizzes`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

export function searchQuizzes(filters){
    return axiosClient
        .post(`/api/quizzes/search`, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function likeQuiz(quizId){
    return axiosClient
        .post(`/api/quizzes/${quizId}/like`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function dislikeQuiz(quizId){
    return axiosClient
        .post(`/api/quizzes/${quizId}/dislike`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function removeLikeOrDislike(quizId){
    return axiosClient
        .delete(`/api/quizzes/${quizId}/like`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}