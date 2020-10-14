import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuizzes } from "../../api/quizApi";
import QuizList from "../DisplayComponents/QuizList";

const ExplorePage = ({ history }) => {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(() => {
        if(!quizzes) {
            getQuizzes().then(quizzesData => {
                setQuizzes(quizzesData);
                console.log(quizzesData);
            }).catch(error => {
                console.log("Error getting quizzes " + error);
            });
        }
    }, [quizzes])

    return (
        <div className="explore-page">
            {!quizzes ? (
                <p>... loading quizzes to explore</p>
            ) : (
            <div className="mt-6">
                <h1 className="font-bold text-2xl mb-4 text-center">Explore</h1>
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
