import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import UsersList from "./UsersList";


const UsersListWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="users-list-w-pagination">
            <UsersList users={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

UsersListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default UsersListWithPagination;
