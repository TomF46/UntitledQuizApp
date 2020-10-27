import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import ScoresTable from "./ScoresTable";



const ScoresTableWithPagination = ({ paginationData, onPageChange, showUser, showQuiz }) => {
    return (
        <div className="quiz-list-w-pagination">
            <ScoresTable scores={paginationData.data} showUser={showUser} showQuiz={showQuiz} startingPosition={paginationData.from} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

ScoresTableWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    showUser: PropTypes.bool.isRequired,
    showQuiz: PropTypes.bool.isRequired

};

export default ScoresTableWithPagination;
