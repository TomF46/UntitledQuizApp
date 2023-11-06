import React from 'react';
import PropTypes from 'prop-types';
import FriendRequestsList from './FriendRequestsList';
import PaginationControls from '../../DisplayComponents/PaginationControls';

const FriendRequestsListWithPagination = ({
  paginationData,
  onPageChange,
  onAccept,
  onRemove,
}) => {
  return (
    <div className='Friends-list-w-pagination'>
      <FriendRequestsList
        requests={paginationData.data}
        onAccept={onAccept}
        onRemove={onRemove}
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

FriendRequestsListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FriendRequestsListWithPagination;
