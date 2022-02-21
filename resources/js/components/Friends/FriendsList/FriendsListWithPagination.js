import React from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import PaginationControls from "../../DisplayComponents/PaginationControls";


const FriendsListWithPagination = ({ paginationData, onPageChange, onRemove }) => {
    return (
        <div className="Friends-list-w-pagination">
            <FriendsList friends={paginationData.data} onRemove={onRemove} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

FriendsListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default FriendsListWithPagination;
