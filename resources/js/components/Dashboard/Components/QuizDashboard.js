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
                        <div className="col-span-1 text-center">
                            <p className="text-sm text-gray-600">Likes:</p>
                            <p>120</p>
                        </div>
                        <div className="col-span-4 text-center">
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
