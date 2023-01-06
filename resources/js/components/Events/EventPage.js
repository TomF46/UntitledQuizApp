import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { endEvent, getEvent, publishEvent } from "../../api/eventApi";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { confirmAlert } from "react-confirm-alert";
import EventLeaderboard from "../DisplayComponents/EventLeaderboard/EventLeaderboard";

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
                            <p className="text-center">Your points: {event.yourTotalPoints}</p>
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
