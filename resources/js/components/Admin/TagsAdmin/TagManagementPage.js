import React, { useEffect, useState } from "react";
import { newTag } from "../../../tools/objectShapes";
import { toast } from "react-toastify";
import { getTag, saveTag } from "../../../api/tagsApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import TagManagementForm from "./TagManagementForm";
import { Prompt, useParams, useHistory } from "react-router-dom";

const TagManagementPage = () => {
    const { tagId } = useParams();
    const [tag, setTag] = useState({ ...newTag });
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (tagId) {
            getTag(tagId)
                .then(data => {
                    setTag({ ...data });
                    setLoaded(true);
                })
                .catch(error => {
                    toast.error(
                        `Error fetching tag to edit ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setTag({ ...newTag });
            setLoaded(true);
        }
    }, [tagId]);

    function handleChange(event) {
        const { name, value } = event.target;
        setTag(prevTag => ({
            ...prevTag,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name } = tag;
        const errors = {};
        if (!name) errors.tag = "Name is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        saveTag(tag).then(response => {
            toast.success("Tag saved");
            history.push(`/admin/tags`);
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error saving tag", {
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
        <div className="tag-management-page">
            {!loaded ? (
                <div className="shadow page">
                    <LoadingMessage message={"Loading form"} />
                </div>
            ) : (
                <>
                    <Prompt when={!saving} message="Are you sure you want to leave? All changes will be lost." />
                    <TagManagementForm tag={tag} errors={errors} saving={saving} onChange={handleChange}
                    onSave={handleSave} />
                </>
            )}
        </div>

    );
};

export default TagManagementPage;
