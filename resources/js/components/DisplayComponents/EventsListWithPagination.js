import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import EventsList from "./EventsList";


const EventsListWithPagination = ({ paginationData, onPageChange}) => {
    return (
        <div className="events-list-w-pagination">
            <EventsList events={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

EventsListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default EventsListWithPagination;
