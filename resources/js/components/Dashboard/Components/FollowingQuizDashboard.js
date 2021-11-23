import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuizzesByUserFollowing, getQuizzesWithPagination } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizListWithPagination from "../../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const FollowingQuizDashboard = ({ user }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);


    useEffect(() => {
        if (!quizzesPaginator) {
            getQuizzesByUserFollowing().then(quizzesData => {
                setQuizzesPaginator(quizzesData);
            }).catch(error => {
                toast.error(`Error getting quizzes ${error.message}`, {
                    autoClose: false,
                });
            });
        }
    }, [quizzesPaginator])

    function getQuizzesPage(url) {
        getQuizzesWithPagination(url).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error(`Error getting quizzes ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="quiz-dashboard px-4 py-2">
            {quizzesPaginator == null ? (
                <LoadingMessage message={"Loading quizzes by people you follow"} />
            ) : (
                <div>
                    <h1 className="font-bold text-2xl text-center md:text-left">Latest quizzes by followed users</h1>
                    {quizzesPaginator.total > 0 ? (
                        <div>
                            <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                        </div>
                    ) : (
                        <p>You currently dont follow any users, please follow some users to see their latest quizzes here.</p>
                    )}

                </div>
            )}
        </div>
    );
};

FollowingQuizDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FollowingQuizDashboard;
