import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
    return (
        <div>
            {events.map((event) => {
                return (
                    <div key={event.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link className="font-bold items-center pointer text-secondary" to={`/admin/events/${event.id}`}>{event.name}</Link>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Description:</p>
                            <p>{event.description}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Status:</p>
                            <p>{event.statusText}</p>
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <Link
                                to={`/admin/events/${event.id}/edit`}
                                className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 align-middle shadow table vertical-centered"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

EventList.propTypes = {
    events: PropTypes.array.isRequired,
};

export default EventList;
