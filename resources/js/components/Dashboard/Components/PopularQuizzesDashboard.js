import React, { useEffect, useState } from "react";
import { getMostPopularQuizzes } from "../../../api/quizApi";
import { toast } from "react-toastify";
import QuizList from "../../DisplayComponents/QuizList";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const PopularQuizzesDashboard = () => {
    const [quizzes, setquizzes] = useState(null);


    useEffect(() => {
        if (!quizzes) {
            getMostPopularQuizzes().then(quizzesData => {
                setquizzes(quizzesData);
            }).catch(error => {
                toast.error("Error getting quizzes " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [quizzes])


    return (
        <div className="quiz-dashboard px-4">
            {quizzes == null ? (
                <LoadingMessage message={'Loading popular quizzes dashboard'} />
            ) : (
                    <div>
                        <h1 className="font-bold text-2xl mb-2">Most popular quizzes</h1>
                        {quizzes.length > 0 ? (
                            <div>
                                <QuizList quizzes={quizzes} />
                            </div>
                        ) : (
                                <p>No quizzes are available please create one</p>
                            )}
                    </div>
                )}
        </div>
    );
};

PopularQuizzesDashboard.propTypes = {
};

export default PopularQuizzesDashboard;
