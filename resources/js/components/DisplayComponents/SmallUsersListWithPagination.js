import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import SmallUsersList from "./SmallUsersList";


const SmallUsersListWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="users-list-w-pagination">
            <SmallUsersList users={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

SmallUsersListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default SmallUsersListWithPagination;
