import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getNotificationsList,
  readNotification,
} from '../../api/notificationsApi';
import LoadingMessage from '../DisplayComponents/LoadingMessage';
import NotificationsListWithPagination from '../DisplayComponents/NotificationsListWithPagination';
import { getPageWithPaginationUrl } from '../../api/paginationApi';
import { decrementNotificationCount } from '../../redux/actions/notificationCountActions';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const [notificationsPaginator, setNotificationsPaginator] = useState(null);

  useEffect(() => {
    if (!notificationsPaginator) {
      getNotifications();
    }
  }, [notificationsPaginator]);

  function getNotifications() {
    getNotificationsList()
      .then((notificationsData) => {
        setNotificationsPaginator(notificationsData);
      })
      .catch((error) => {
        toast.error(`Error getting notifications ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleReadNotificationRequest(notification) {
    if (notification.read) return;

    readNotification(notification.id)
      .then(() => {
        dispatch(decrementNotificationCount());
        getNotifications();
      })
      .catch((error) => {
        toast.error(`Error reading notification ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleNotificationListPageChange(url) {
    getPageWithPaginationUrl(url)
      .then((notificationsData) => {
        setNotificationsPaginator(notificationsData);
      })
      .catch((error) => {
        toast.error(`Error getting notifications ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='Notifications-page'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0'>
          <div className='px-4 pb-4 overflow-hidden shadow page'>
            <h1 className='font-bold text-primary text-4xl my-4 text-center'>
              Details
            </h1>
            <p>On this page you can view your notifications</p>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-9'>
          <div className='overflow-hidden shadow card px-4'>
            <h1 className='font-bold text-primary text-primary text-2xl text-center md:text-left my-4'>
              Notifications
            </h1>
            {!notificationsPaginator ? (
              <LoadingMessage message={'Loading Notification requests'} />
            ) : notificationsPaginator.total > 0 ? (
              <NotificationsListWithPagination
                paginationData={notificationsPaginator}
                onPageChange={handleNotificationListPageChange}
                onSetRead={handleReadNotificationRequest}
              />
            ) : (
              <p className='text-center pb-4'>
                You do not currently have any notifications.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
