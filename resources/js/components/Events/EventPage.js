import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { endEvent, getEvent, publishEvent } from "../../api/eventApi";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { confirmAlert } from "react-confirm-alert";
import EventLeaderboard from "../DisplayComponents/EventLeaderboard/EventLeaderboard";
import { Link } from "react-router-dom";

const EventPage = ({ eventId }) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!event || event.id != eventId) {
            loadEvent();
        }
    }, [eventId, event]);

    function loadEvent() {
        getEvent(eventId)
            .then((eventData) => {
                setEvent(eventData);
            })
            .catch((error) => {
                toast.error(`Error getting event ${error.message}`, {
                    autoClose: false,
                });
            });
    }

    function onPublish() {
        confirmAlert({
            title: "Confirm action",
            message: `Are you sure you want to publish this event?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        handlePublish();
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    }

    function handlePublish() {
        publishEvent(event.id)
            .then((res) => {
                toast.success("Event is now live");
                loadEvent();
            })
            .catch((error) => {
                toast.error(`Error publishing event ${error.message}`, {
                    autoClose: false,
                });
            });
    }

    function onEnd() {
        confirmAlert({
            title: "Confirm action",
            message: `Are you sure you want to end this event?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        handleEnd();
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    }

    function handleEnd() {
        endEvent(event.id)
            .then((res) => {
                toast.success("Event is now closed");
                loadEvent();
            })
            .catch((error) => {
                toast.error(`Error ending event ${error.message}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="event-page">
            {event == null ? (
                <LoadingMessage message={"Loading event"} />
            ) : (
                <>
                    <div className="grid grid-cols-12 pb-4">
                        <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0">
                            <div className="px-4 pb-4 overflow-hidden shadow card mb-4">
                                <h2 className="font-bold text-primary text-4xl py-4 text-center">
                                    {event.name}
                                </h2>
                                <div className="py-4">
                                    <h3 className="text-lg font-bold text-center">
                                        Description
                                    </h3>
                                    <p className="text-center">
                                        {event.description}
                                    </p>
                                </div>
                                <div className="py-4">
                                    <h3 className="text-lg font-bold text-center">
                                        Categories
                                    </h3>
                                    <div>
                                        <ul className="tagList text-center my-4">
                                            {event.isUniversal == true ? (
                                                <li className="rounded-full py-1 px-4 bg-secondary hover:opacity-75 my-1 text-white shadow">
                                                    All
                                                </li>
                                            ) : (
                                                <>
                                                    {event.includedTags.map(
                                                        (tag) => {
                                                            return (
                                                                <li
                                                                    className="rounded-full py-1 px-4 bg-secondary hover:opacity-75 my-1 text-white shadow"
                                                                    key={tag.id}
                                                                >
                                                                    {tag.name}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-4 overflow-hidden shadow card mb-4">
                                <h2 className="font-bold text-primary text-xl py-4 text-center">
                                    My Points
                                </h2>
                                <div>
                                    <svg
                                        className="text-secondary center-svg w-20 h-20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                                        />
                                    </svg>
                                </div>
                                <p className="text-secondary text-center font-bold text-lg">
                                    {event.yourTotalPoints}
                                </p>
                            </div>
                            <div className="px-4 pb-4 overflow-hidden shadow card">
                                <h2 className="font-bold text-primary text-xl py-4 text-center">
                                    Rules
                                </h2>
                                <div className="text-sm">
                                    <p className="font-bold">Complete quizzes in the categories shown.</p>
                                    <p className="font-bold">Score points depending on how well you do:</p>
                                    <ul>
                                        <li>100%: {event.scoreMax} points</li>
                                        <li> &#62; 75%: {event.scoreGroup4} points</li>
                                        <li> &#62; 50%: {event.scoreGroup3} points</li>
                                        <li> &#62; 25%: {event.scoreGroup2} points</li>
                                        <li> &#60; 25%: {event.scoreGroup1} points</li>
                                    </ul>
                                    <p className="font-bold">If scores are tied the tie breaker is in the following order:</p>
                                    <ol>
                                        <li>1. Total points</li>
                                        <li>2. Submissions to get to that total, least attempts wins</li>
                                        <li>3. User who achieved their points total first</li>
                                    </ol>
                                </div> 
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                            <div className="px-4 py-8 overflow-hidden shadow bg-secondary mb-4">
                                <h3 className="text-center text-white text-4xl">
                                    Event status: {event.statusText}
                                </h3>
                            </div>
                            {event.top3.length > 0 && (
                                <div className="px-4 py-2 overflow-hidden shadow card mb-4">
                                <h3 className="text-center font-bold text-secondary text-2xl">
                                    Top 3
                                </h3>
                                <div className="grid grid-cols-12">
                                    {event.top3.map((score, index) => {
                                        return (
                                            <div className="col-span-4">
                                                <h2 className="font-bold text-secondary text-xl py-4 text-center">
                                                    {index + 1}
                                                </h2>
                                                <div className="mb-4">
                                                    <svg
                                                        className="text-yellow-400 center-svg w-16 h-16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-secondary text-center font-bold text-lg">
                                                    <Link to={`/profile/${score.user_id}`}>{score.username}</Link>
                                                </p>
                                                <p className="text-secondary text-center text-lg">
                                                    {score.score}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}
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
