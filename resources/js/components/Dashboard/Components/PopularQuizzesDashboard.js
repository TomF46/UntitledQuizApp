import React, { useEffect, useState } from "react";
import { getMostPopularQuizzes } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizList from "../../DisplayComponents/QuizList";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const PopularQuizzesDashboard = () => {
    const [quizzes, setquizzes] = useState(null);
    

    useEffect(() => {
        if(!quizzes) {
            getMostPopularQuizzes().then(quizzesData => {
                setquizzes(quizzesData);
            }).catch(error => {
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzes])


    return (
        <div className="quiz-dashboard border-t">
            {quizzes == null ? (
                <LoadingMessage message={'Loading popular quizzes dashboard'} />
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
