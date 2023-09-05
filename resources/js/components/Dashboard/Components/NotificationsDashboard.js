import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import NotificationsListWithPagination from "../../DisplayComponents/NotificationsListWithPagination";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";
import { getNotificationsDashboard, readNotification } from "../../../api/notificationsApi";
import { decrementNotificationCount } from "../../../redux/actions/notificationCountActions";

const NotificationsDashboard = () => {
    const dispatch = useDispatch();
    const [notificationsPaginator, setNotificationsPaginator] = useState(null);

    useEffect(() => {
        if (!notificationsPaginator) {
            getNotifications();
        }
    }, [notificationsPaginator]);

    function getNotifications() {
        getNotificationsDashboard().then(notificationsData => {
            setNotificationsPaginator(notificationsData);
        }).catch(error => {
            toast.error(`Error getting notifications ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleReadNotificationRequest(notification) {
        if (notification.read) return;

        readNotification(notification.id).then(() => {
            dispatch(decrementNotificationCount());
            getNotifications();
        }).catch(error => {
            toast.error(`Error reading notification ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleNotificationListPageChange(url) {
        getPageWithPaginationUrl(url).then(notificationsData => {
            setNotificationsPaginator(notificationsData);
        }).catch(error => {
            toast.error(`Error getting notifications ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="notifications-dashboard px-4 py-2">
            {!notificationsPaginator ? (
                <LoadingMessage message={'Loading Notification requests'} />
            ) : (
                <div>
                    <h1 className="font-bold text-primary text-2xl text-center md:text-left">Your latest unread notifications</h1>
                    {notificationsPaginator.total > 0 ? (
                        <NotificationsListWithPagination paginationData={notificationsPaginator} onPageChange={handleNotificationListPageChange} onSetRead={handleReadNotificationRequest} />
                    ) : (
                        <p>You do not currently have any notifications.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDashboard;
