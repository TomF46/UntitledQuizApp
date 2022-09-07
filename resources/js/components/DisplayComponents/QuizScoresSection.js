import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingMessage from "./LoadingMessage";
import { getScoresForQuiz } from "../../api/quizApi";
import { getPageWithPaginationUrl } from "../../api/paginationApi";
import ScoresTableWithPagination from "./ScoresTableWithPagination";

const QuizScoresSection = ({ quiz }) => {
    const [scoresPaginator, setScores] = useState(null);

    useEffect(() => {
        getScores();
    }, [quiz])


    function getScores() {
        getScoresForQuiz(quiz.id).then(scores => {
            setScores(scores);
        }).catch(error => {
            toast.error(`Error getting scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getScoresPage(url) {
        getPageWithPaginationUrl(url).then(scoreData => {
            setScores(scoreData);
        }).catch(error => {
            toast.error(`Error getting user scores ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="inline-block p-4 min-w-full">
            <h2 className="font-bold text-primary text-2xl mb-4 text-center">Scores</h2>
            {!scoresPaginator ? (
                <LoadingMessage message={'Loading scores'} />
            ) : (
                <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={getScoresPage} showUser={true} showQuiz={false} />
            )}
        </div>
    );
};

QuizScoresSection.propTypes = {
    quiz: PropTypes.object.isRequired
};

export default QuizScoresSection;