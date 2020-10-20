import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getQuizzesByUser, getQuizzesWithPagination } from "../../../api/quizApi";
import { toast } from "react-toastify";
import PaginationControls from "../../DisplayComponents/PaginationControls";

const QuizDashboard = ({ user }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    

    useEffect(() => {
        if(!quizzesPaginator) {
            getQuizzesByUser(user.profile.id).then(quizzesData => {
                setQuizzesPaginator(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzesPaginator])

    function handleNext(){
        getQuizzesWithPagination(quizzesPaginator.next_page_url).then(quizzesData => {
            console.log(quizzesData);
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function handlePrevious(){
        getQuizzesWithPagination(quizzesPaginator.prev_page_url).then(quizzesData => {
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
                {quizzesPaginator.data.map((quiz) => {
                return (
                    <div key={quiz.id} className="grid grid-cols-12 px-4 py-2 border-b overflow-hidden">
                        <div className="col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <h3 className="font-bold text-lg items-center">{quiz.title}</h3>
                        </div>
                        <div className="col-span-2 text-center">
                            <p className="text-sm text-gray-600">Total Questions:</p>
                            <p>{quiz.questionsCount} questions</p>
                        </div>
                        <div className="col-span-1 text-center">
                            <p className="text-sm text-gray-600">Plays:</p>
                            <p>{quiz.totalPlays}</p>
                        </div>
                        <div className="col-span-1 inline-flex items-center justify-center">
                            <svg className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <p className="ml-1">{quiz.totalLikes}</p>
                        </div>
                        <div className="col-span-1 inline-flex items-center justify-center">
                            <svg className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            <p className="ml-1">{quiz.totalDislikes}</p>
                        </div>
                        <div className="col-span-3 text-center">
                            <p className="text-sm text-gray-600">Actions:</p>
                            <Link
                                to={`/quiz/${quiz.id}/play`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Play
                            </Link>
                            <span> | </span>
                            <Link
                                to={`/quiz/${quiz.id}`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Details
                            </Link>
                            <span> | </span>
                            <Link
                                to={`/quiz/${quiz.id}/edit`}
                                className="text-center hover:text-purple-500 hover:underline"
                            >
                                Edit
                            </Link>
                            <span> | </span>
                            <Link
                                to={'/'}
                                className="text-center hover:text-red-500 hover:underline"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                )
            })}
                <PaginationControls to={quizzesPaginator.to} from={quizzesPaginator.from} of={quizzesPaginator.total} onNext={handleNext} onPrevious={handlePrevious} currentPage={quizzesPaginator.current_page} lastPage={quizzesPaginator.last_page} />
            </div>
            )}
        </div>
    );
};

QuizDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default QuizDashboard;
