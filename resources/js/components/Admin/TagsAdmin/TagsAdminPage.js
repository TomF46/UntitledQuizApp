import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { deleteTag, getTags, getTagsPaginated, getTagsWithUrl } from "../../../api/tagsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import TagsListWithPagination from "../../DisplayComponents/TagsListWithPagination";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

const TagsAdminPage = ({ history }) => {
    const [tagsPaginator, setTagsPaginator] = useState(null);
    useEffect(() => {
        if (!tagsPaginator) {
            getTagsPaginated().then(tagsData => {
                setTagsPaginator(tagsData);
            }).catch(error => {
                toast.error(`Error getting tags ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [tagsPaginator])

    function getTagsPage(url) {
        getTagsWithUrl(url).then(tagsData => {
            setTagsPaginator(tagsData);
        }).catch(error => {
            toast.error(`Error getting tags ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleDeleteTag(tag) {
        confirmAlert({
            title: "Confirm deletion",
            message: `Are you sure you want to delete ${tag.name}?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => removeTag(tag),
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function removeTag(tag) {
        deleteTag(tag.id).then(response => {
            toast.success("Tag deleted.")
            getTagsPage(`${tagsPaginator.path}?page=${tagsPaginator.current_page}`)
        }).catch(error => {
            toast.error(`Unable to delete tag ${error.message}`, {
                autoClose: false,
            });
        })
    }



    return (
        <div className="tags-admin-page">
            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow page">
                    <h1 className="font-bold text-4xl my-4 text-center">Admin controls</h1>
                    <p className="my-4">Add, remove, and edit the available tags that can be added to user created quizzes.</p>
                    <div className="flex flex-col justify-center text-center">
                        <Link
                            to={`/admin/tags/create`}
                            className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                        >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="ml-1">Add Tag</span>
                        </Link>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 overflow-hidden shadow page px-4">
                    {!tagsPaginator ? (
                        <LoadingMessage message={'Loading tags'} />
                    ) : (
                        <>
                            <h1 className="font-bold text-4xl my-4 text-center">Tags</h1>
                            {tagsPaginator.total > 0 ? (
                                <TagsListWithPagination paginationData={tagsPaginator} onPageChange={getTagsPage} onDelete={handleDeleteTag} />
                            ) : (
                                <p className="text-center">There are currently no tags added.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

TagsAdminPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default TagsAdminPage;
