import React, { useEffect, useState } from "react";
import { getUsersUnpublishedQuizzes } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizListWithPagination from "../../DisplayComponents/QuizListWithPagination";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";

const UnpublishedQuizDashboard = () => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);

    useEffect(() => {
        if (!quizzesPaginator) {
            getUsersUnpublishedQuizzes().then(quizzesData => {
                setQuizzesPaginator(quizzesData);
            }).catch(error => {
                toast.error(`Error getting unpublished quizzes ${error.message}`, {
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
        quizzesPaginator && quizzesPaginator.total > 0 && (
            <div className="mb-6 overflow-hidden shadow card">
                <div className="users-following-dashboard px-4 py-2">
                    <h1 className="font-bold text-primary text-2xl text-center md:text-left">Your unpublished quizzes</h1>
                    <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                </div>
            </div>
        )
    );
};

export default UnpublishedQuizDashboard;
