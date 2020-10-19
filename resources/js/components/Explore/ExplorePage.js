import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuizzes, getQuizzesWithPagination } from "../../api/quizApi";
import QuizList from "../DisplayComponents/QuizList";
import { toast } from "react-toastify";
import PaginationControls from "../DisplayComponents/PaginationControls";

const ExplorePage = ({ history }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);

    useEffect(() => {
        if(!quizzesPaginator) {
            getQuizzes().then(quizzesData => {
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
        <div className="explore-page overflow-hidden shadow-lg page mb-2">
            {!quizzesPaginator ? (
                <p>... loading quizzes to explore</p>
            ) : (
            <div>
                <h1 className="font-bold text-4xl py-4 text-center pageHeader">Explore</h1>
                <div className="border-b p-4">
                    <p>Filters</p>
                </div>
                <QuizList quizzes={quizzesPaginator.data} />
                <PaginationControls to={quizzesPaginator.to} from={quizzesPaginator.from} of={quizzesPaginator.total} onNext={handleNext} onPrevious={handlePrevious} currentPage={quizzesPaginator.current_page} lastPage={quizzesPaginator.last_page} />
            </div>
            )}
        </div>
    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;
