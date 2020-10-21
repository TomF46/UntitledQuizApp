import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuizzesByUserFollowing, getQuizzesWithPagination } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizListWithPagination from "../../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const FollowingQuizDashboard = ({ user }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    

    useEffect(() => {
        if(!quizzesPaginator) {
            getQuizzesByUserFollowing().then(quizzesData => {
                setQuizzesPaginator(quizzesData);
            }).catch(error => {
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzesPaginator])

    function getQuizzesPage(url){
        getQuizzesWithPagination(url).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    return (
        <div className="quiz-dashboard border-t">
            {quizzesPaginator == null ? (
                <LoadingMessage message={"Loading quizzes by people you follow"} />
            ) : (
            <div>
                <h1 className="font-bold text-xl p-4 border-b">Latest quizzes by people you follow</h1>
                <div className="border-b">
                <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizzesPage} />
                </div>
            </div>
            )}
        </div>
    );
};

FollowingQuizDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FollowingQuizDashboard;
