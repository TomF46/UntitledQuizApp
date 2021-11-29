import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TagList = ({ tags, onDelete }) => {
    return (
        <div>
            {tags.map((tag) => {
                return (
                    <div key={tag.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-10">
                            <p className="font-medium">{tag.name}</p>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <Link
                                to={`/admin/tags/${tag.id}`}
                                className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 align-middle shadow table vertical-centered"
                            >
                                Edit
                            </Link>
                            <div className="table vertical-centered">
                                <button
                                    onClick={() => onDelete(tag)}
                                    className="bg-red-800 text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center ml-2"
                                >
                                    <p className="ml-1">Delete</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

TagList.propTypes = {
    tags: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TagList;
