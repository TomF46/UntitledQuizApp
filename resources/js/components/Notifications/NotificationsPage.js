import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getNotificationsList, readNotification } from "../../api/notificationsApi";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import NotificationsListWithPagination from "../DisplayComponents/NotificationsListWithPagination";
import { getPageWithPaginationUrl } from "../../api/paginationApi";

const NotificationsPage = ({ history }) => {
    const [notificationsPaginator, setNotificationsPaginator] = useState(null);

    useEffect(() => {
        if (!notificationsPaginator) {
            getNotifications();
        }
    }, [notificationsPaginator]);

    function getNotifications() {
        getNotificationsList().then(notificationsData => {
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
        <div className="Notifications-page">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow page">
                    <h1 className="font-bold text-primary text-4xl my-4 text-center">Details</h1>
                    <p>On this page you can view your notifications</p>
                </div>
                <div className="col-span-12 lg:col-span-9">
                    <div className="mb-6 overflow-hidden shadow card px-4 py-2">
                        <h1 className="font-bold text-primary text-primary text-2xl text-center md:text-left">Notifications</h1>
                        {!notificationsPaginator ? (
                            <LoadingMessage message={'Loading Notification requests'} />
                        ) : (
                            notificationsPaginator.total > 0 ? (
                                <NotificationsListWithPagination paginationData={notificationsPaginator} onPageChange={handleNotificationListPageChange} onSetRead={handleReadNotificationRequest} />
                            ) : (
                                <p>You do not currently have any notifications.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

NotificationsPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default NotificationsPage;
