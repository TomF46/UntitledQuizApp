import React from 'react';
import PropTypes from 'prop-types';
import EventLeaderboardTable from './EventLeaderboardTable';
import PaginationControls from '../PaginationControls';

const EventLeaderboardTableWithPagination = ({
  paginationData,
  onPageChange,
}) => {
  return (
    <div className='event-leaderboard-list-w-pagination'>
      <EventLeaderboardTable
        scores={paginationData.data}
        startingPosition={paginationData.from}
      />
      <PaginationControls
        to={paginationData.to}
        from={paginationData.from}
        of={paginationData.total}
        onNext={() => onPageChange(paginationData.next_page_url)}
        onPrevious={() => onPageChange(paginationData.prev_page_url)}
        currentPage={paginationData.current_page}
        lastPage={paginationData.last_page}
      />
    </div>
  );
};

EventLeaderboardTableWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default EventLeaderboardTableWithPagination;
