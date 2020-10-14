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
            <QuizList quizzes={quizzes} />
            )}
        </div>
    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;