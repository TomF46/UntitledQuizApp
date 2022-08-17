import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const NotificationsList = ({ notifications, onSetRead }) => {
    return (
        <div>
            {notifications.map((notification) => {
                return (
                    <div key={notification.id} onClick={() => onSetRead(notification)} className={`grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden ${!notification.read ? 'bg-secondaryLight pointer' : ''}`}>
                        <div className="col-span-2 md:col-span-1 inline-flex items-center">
                            <img src={notification.icon} alt="icon" className="rounded-full h-10 w-10" />
                        </div>
                        <div className="col-span-8 md:col-span-10 flex">
                            <p className="vertical-centered-text">{notification.text}</p>
                        </div>
                        <div className="col-span-2 md:col-span-1 flex">
                            <p className="text-sm vertical-centered-text"><Moment fromNow>{notification.created_at}</Moment></p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

NotificationsList.propTypes = {
    notifications: PropTypes.array.isRequired,
    onSetRead: PropTypes.func.isRequired
};

export default NotificationsList;
