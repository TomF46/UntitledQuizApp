import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import QuizList from "./QuizList";


const QuizListWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="quiz-list-w-pagination">
            <QuizList quizzes={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

QuizListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default QuizListWithPagination;
