import React, { useEffect, useState } from "react";
import { getRecommendedQuizzes } from "../../../api/quizApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import QuizListWithPagination from "../../DisplayComponents/QuizListWithPagination";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";

const RecommendedQuizzesDashboard = () => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);

    useEffect(() => {
        if (!quizzesPaginator) {
            getRecommendedQuizzes().then(quizzesData => {
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
            toast.error(`Error getting recommended quizzes ${error.message}`, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="recommended-quiz-dashboard px-4 py-2">
            {quizzesPaginator == null ? (
                <LoadingMessage message={'Loading recommended quizzes dashboard'} />
            ) : (
                <div>
                    <h1 className="font-bold text-2xl text-center md:text-left">QuizApp recommended quizzes</h1>
                    {quizzesPaginator.total > 0 ? (
                        <div>
                            <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                        </div>
                    ) : (
                        <p>There are currently no QuizApp recommended quizzes</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecommendedQuizzesDashboard;
