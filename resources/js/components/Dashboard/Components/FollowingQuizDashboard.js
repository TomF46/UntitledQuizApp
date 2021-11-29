import React, { useEffect, useState } from "react";
import { getQuizzesByUserFollowing } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizListWithPagination from "../../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";

const FollowingQuizDashboard = () => {
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
        getPageWithPaginationUrl(url).then(quizzesData => {
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
                    <h1 className="font-bold text-primary text-2xl text-center md:text-left">Latest quizzes by followed users</h1>
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

export default FollowingQuizDashboard;
