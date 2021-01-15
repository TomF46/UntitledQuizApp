import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import { addComment } from "../../../api/quizApi";
import { toast } from "react-toastify";
import Comment from "./Comment";
import PaginationControls from "../PaginationControls";

const CommentsSection = ({ quizId, comments, onReloadQuiz }) => {
    const pageLength = 10;
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [commentsPagination, setComments] = useState([]);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(pageLength);

    useEffect(() => {
        let chunkedComments = chunkArray(comments, pageLength);
        setComments(chunkedComments);
    }, [comments]);

    function handleCommentChange(event) {
        const { name, value } = event.target;
        setComment(value);
    }

    function commentIsValid() {
        const errors = {};
        if (!comment) errors.comment = "Comment text is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleCommentSubmit(event) {
        event.preventDefault();
        if (!commentIsValid()) return;
        setSubmitting(true);

        addComment(quizId, comment)
            .then(response => {
                toast.success("Comment added");
                onReloadQuiz();
                setSubmitting(false);
                setComment("");
            })
            .catch(err => {
                setSubmitting(false);
                toast.error("Error adding comment", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
            });
    }

    function chunkArray(array, size) {
        let result = []
        let arrayCopy = [...array]
        while (arrayCopy.length > 0) {
            result.push(arrayCopy.splice(0, size))
        }
        return result
    }

    function handleNext() {
        setFrom(from + pageLength);
        setTo(to + pageLength);
        setPaginationIndex(paginationIndex + 1);
    }

    function handlePrevious() {
        setFrom(from - pageLength);
        setTo(to - pageLength);
        setPaginationIndex(paginationIndex - 1);
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-4 text-center">Comments</h2>
            {comments.length <= 0 ? (
                <p className="px-4">This quiz currently has no comment, why not add one</p>
            ) : (
                    commentsPagination.length > 0 && (
                        <div className="p-4">
                            {commentsPagination[paginationIndex - 1].map((comment) => {
                                return (
                                    <Comment key={comment.id} comment={comment} />
                                )
                            })}
                            <PaginationControls from={from} to={to} of={comments.length} currentPage={paginationIndex} lastPage={commentsPagination.length} onNext={handleNext} onPrevious={handlePrevious} />
                        </div>
                    )
                )}
            <CommentForm comment={comment} onChange={handleCommentChange} errors={errors} submitting={submitting} onSubmit={handleCommentSubmit} />
        </div>
    );
};

CommentsSection.propTypes = {
    quizId: PropTypes.any.isRequired,
    comments: PropTypes.array.isRequired,
    onReloadQuiz: PropTypes.func.isRequired
};

export default CommentsSection;
