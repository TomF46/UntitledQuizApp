import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import ChallengePointsLeaderboard from "./ChallengePointsLeaderboard";



const ChallengePointsLeaderboardWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="quiz-list-w-pagination">
            <ChallengePointsLeaderboard rows={paginationData.data} startingPosition={paginationData.from} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

ChallengePointsLeaderboardWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ChallengePointsLeaderboardWithPagination;
