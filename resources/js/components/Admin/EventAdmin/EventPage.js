import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { endEvent, getEvent, publishEvent } from "../../../api/eventApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import EventLeaderboard from "../../DisplayComponents/EventLeaderboard/EventLeaderboard";

const EventPage = ({ eventId }) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!event || event.id != eventId) {
            loadEvent();
        }
    }, [eventId, event])

    function loadEvent() {
        getEvent(eventId).then(eventData => {
            setEvent(eventData);
        }).catch(error => {
            toast.error(`Error getting event ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function onPublish(){
        confirmAlert({
            title: "Confirm action",
            message: `Are you sure you want to publish this event?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {handlePublish()},
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        })
    }

    function handlePublish(){
        publishEvent(event.id).then(res => {
            toast.success("Event is now live");
            loadEvent();
        }).catch(error => {
            toast.error(`Error publishing event ${error.message}`, {
                autoClose: false,
            });
        })
    }

    function onEnd(){
        confirmAlert({
            title: "Confirm action",
            message: `Are you sure you want to end this event?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {handleEnd()},
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        })
    }

    function handleEnd(){
        endEvent(event.id).then(res => {
            toast.success("Event is now closed");
            loadEvent();
        }).catch(error => {
            toast.error(`Error ending event ${error.message}`, {
                autoClose: false,
            });
        })
    }



    return (
        <div className="event-page">
            {event == null ? (
                <LoadingMessage message={'Loading event'} />
            ) : (
                <>
                    <div className="grid grid-cols-12 pb-4">
                        <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow card">
                            <h2 className="font-bold text-primary text-4xl py-4 text-center">
                                {event.name}
                            </h2>
                            <p className="text-center">{event.description}</p>
                            <p className="text-center">{event.statusText}</p>
                            <div className="flex flex-col justify-center text-center">
                                {event.status == 0 && (
                                    <button
                                        type="button"
                                        onClick={onPublish}
                                        className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                    >
                                        <svg className="text-secondary h-5 w-5"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path  strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="ml-1 font-bold">Publish</span>
                                    </button>
                                )}
                                {event.status == 1 && (
                                    <button
                                        type="button"
                                        onClick={onEnd}
                                        className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                    >
                                        <svg className="text-secondary h-5 w-5"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path  strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="ml-1 font-bold">End</span>
                                    </button>
                                )}
                                <Link
                                    to={`/admin/events/${event.id}/edit`}
                                    className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                                >
                                    <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span className="ml-1 font-bold">Edit</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                            <div className="px-4 py-2 overflow-hidden shadow card">
                                <EventLeaderboard event={event} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

EventPage.propTypes = {
    eventId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        eventId: ownProps.match.params.eventId,
    };
};

export default connect(mapStateToProps)(EventPage);
