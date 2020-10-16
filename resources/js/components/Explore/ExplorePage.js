import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuizzes } from "../../api/quizApi";
import QuizList from "../DisplayComponents/QuizList";
import { toast } from "react-toastify";

const ExplorePage = ({ history }) => {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(() => {
        if(!quizzes) {
            getQuizzes().then(quizzesData => {
                setQuizzes(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
                toast.error("Error getting quizzes " + error.message,{
                    autoClose: false,
                });
            });
        }
    }, [quizzes])

    return (
        <div className="explore-page">
            {!quizzes ? (
                <p>... loading quizzes to explore</p>
            ) : (
            <div className="mt-6">
                <h1 className="font-bold text-4xl my-4 text-center pageHeader">Explore</h1>
                <QuizList quizzes={quizzes} />
            </div>
            )}
        </div>
    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;
