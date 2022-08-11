import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NotificationsList = ({ notifications, onSetRead }) => {
    return (
        <div>
            {notifications.map((notification) => {
                return (
                    <div key={notification.id} onClick={() => onSetRead(notification)} className={`grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden ${!notification.read ? 'bg-secondaryLight pointer' : ''}`}>
                        <div className="col-span-1 inline-flex items-center">
                            <img src={notification.icon} alt="icon" className="rounded-full h-10 w-10" />
                        </div>
                        <div className="col-span-11">
                            <p>{notification.text}</p>
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
