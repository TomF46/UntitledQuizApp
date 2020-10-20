import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getQuizzesByUserFollowing, getMostPopularQuizzes } from "../../../api/quizApi";
import { toast } from "react-toastify";
import PaginationControls from "../../DisplayComponents/PaginationControls";
import QuizList from "../../DisplayComponents/QuizList";

const PopularQuizzesDashboard = () => {
    const [quizzes, setquizzes] = useState(null);
    

    useEffect(() => {
        if(!quizzes) {
            getMostPopularQuizzes().then(quizzesData => {
                console.log(quizzesData);
                setquizzes(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzes])


    return (
        <div className="quiz-dashboard border-t">
            {quizzes == null ? (
                <p>...Loading most popular quizzes dashboard</p>
            ) : (
            <div>
                <h1 className="font-bold text-xl p-4 border-b">Most popular quizzes</h1>
                <div className="border-b">
                <QuizList quizzes={quizzes} />
                </div>
            </div>
            )}
        </div>
    );
};

PopularQuizzesDashboard.propTypes = {
};

export default PopularQuizzesDashboard;
