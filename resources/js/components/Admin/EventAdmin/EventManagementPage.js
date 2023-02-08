import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newEvent } from "../../../tools/objectShapes";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import EventManagementForm from "./EventManagementForm";
import { getEventForEdit, saveEvent } from "../../../api/eventApi";
import { getTags } from "../../../api/tagsApi";
import { Prompt } from "react-router-dom";

const EventManagementPage = ({ eventId, history }) => {
    const [event, setEvent] = useState({ ...newEvent });
    const [tags, setTags] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (eventId) {
            getEventForEdit(eventId)
                .then(data => {
                    setEvent({ ...data });
                    setLoaded(true);
                })
                .catch(error => {
                    toast.error(
                        `Error fetching event to edit ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setEvent({ ...newEvent });
            setLoaded(true);
        }
    }, [eventId]);

    useEffect(() => {
        if (!tags) {
            getTags().then(tags => {
                setTags(tags);
            });
        }
    }, [tags]);

    function handleChange(event) {
        const { name, value, checked } = event.target;

        let input = value;
        input = name == "universal" ? checked : input;

        setEvent(prevEvent => ({
            ...prevEvent,
            [name]: input
        }));
    }

    function handleTagsChange(selected) {
        setEvent(prevEvent => ({
            ...prevEvent,
            tags: selected
        }));
    }

    function formIsValid() {
        const { name, description, score_group_1, score_group_2,score_group_3, score_group_4, score_max } = event;
        const errors = {};
        if (!name || name.length == 0) errors.name = "Name is required";
        if (!description || description.length == 0) errors.description = "Description is required";
        if (!description || description.length == 0) errors.description = "Description is required";
        if (!score_group_1) errors.score_group_1 = "Score group 1 value is required";
        if (!score_group_2) errors.score_group_2 = "Score group 2 value is required";
        if (!score_group_3) errors.score_group_3 = "Score group 3 value is required";
        if (!score_group_4) errors.score_group_4 = "Score group 4 value is required";
        if (!score_max) errors.score_max = "Score max value is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(publish) {
        
        if (!formIsValid()) return;
        setSaving(true);

        let eventToPost = { ...event };

        if(event.universal) eventToPost.tags = [];
        eventToPost.publish = publish;
        eventToPost.tags = event.tags.map(tag => tag.value);

        saveEvent(eventToPost).then(response => {
            toast.success("Event saved");
            history.push(`/admin/events`);
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error saving event", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
            });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }



    return (
        <div className="event-management-page">
            {!loaded ? (
                <div className="shadow page">
                    <LoadingMessage message={"Loading form"} />
                </div>
            ) : (
                <>
                    <Prompt when={!saving} message="Are you sure you want to leave? All changes will be lost." />
                    <EventManagementForm event={event} tags={tags} errors={errors} saving={saving} onChange={handleChange}
                    onSave={handleSave} onTagsChange={handleTagsChange} />
                </>
            )}
        </div>

    );
};

EventManagementPage.propTypes = {
    eventId: PropTypes.any,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        eventId: ownProps.match.params.eventId,
    };
};

export default connect(mapStateToProps)(EventManagementPage);
