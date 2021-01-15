import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import ChallengeScoresTable from "./ChallengeScoresTable";



const ChallengeScoresTableWithPagination = ({ paginationData, onPageChange, onScoreSelected }) => {
    return (
        <div className="quiz-list-w-pagination">
            <ChallengeScoresTable scores={paginationData.data} onScoreSelected={onScoreSelected} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

ChallengeScoresTableWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onScoreSelected: PropTypes.func.isRequired,
};

export default ChallengeScoresTableWithPagination;
