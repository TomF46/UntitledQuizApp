import axiosClient from "../tools/axiosClient";

export function getNotificationsList() {
    return axiosClient
        .get("/api/notifications")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function readNotification($notificationId) {
    return axiosClient
        .put(`/api/notifications/${$notificationId}/read`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getNotificationsDashboard() {
    return axiosClient
        .get("/api/dashboard/notifications")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getNotificationsCount() {
    return axiosClient
        .get("/api/notifications/count")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}