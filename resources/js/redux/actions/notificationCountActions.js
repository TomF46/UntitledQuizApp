import { getNotificationsCount } from '../../api/notificationsApi';
import * as types from './actionTypes';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadNotificationCountSuccess(notificationCount) {
  return { type: types.LOAD_NOTIFICATION_COUNT_SUCCESS, notificationCount };
}

export function notificationCountDecrement() {
  return { type: types.NOTIFICATION_COUNT_DECREMENT };
}

export function loadNotificationCount() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getNotificationsCount()
      .then((res) => {
        dispatch(loadNotificationCountSuccess(res.count));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function decrementNotificationCount() {
  return function (dispatch) {
    dispatch(notificationCountDecrement());
  };
}
