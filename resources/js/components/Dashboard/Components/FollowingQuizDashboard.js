import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getQuizzesByUserFollowing, getQuizzesWithPagination } from "../../../api/quizApi";
import { toast } from "react-toastify";
import PaginationControls from "../../DisplayComponents/PaginationControls";
import QuizList from "../../DisplayComponents/QuizList";

const FollowingQuizDashboard = ({ user }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    

    useEffect(() => {
        if(!quizzesPaginator) {
            getQuizzesByUserFollowing().then(quizzesData => {
                setQuizzesPaginator(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
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
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    return (
        <div className="quiz-dashboard border-t">
            {quizzesPaginator == null ? (
                <p>...Loading quiz dashboard</p>
            ) : (
            <div>
                <h1 className="font-bold text-xl p-4 border-b">Latest quizzes by people you follow</h1>
                <div className="border-b">
                <QuizList quizzes={quizzesPaginator.data} />
                <PaginationControls to={quizzesPaginator.to} from={quizzesPaginator.from} of={quizzesPaginator.total} onNext={() => getQuizzesPage(quizzesPaginator.next_page_url)} onPrevious={() => getQuizzesPage(quizzesPaginator.prev_page_url)} currentPage={quizzesPaginator.current_page} lastPage={quizzesPaginator.last_page} />
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
