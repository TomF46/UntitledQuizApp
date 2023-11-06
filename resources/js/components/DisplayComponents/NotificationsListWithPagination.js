import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import NotificationsList from './NotificationsList';

const NotificationsListWithPagination = ({
  paginationData,
  onPageChange,
  onSetRead,
}) => {
  return (
    <div className='Notification-list-w-pagination'>
      <NotificationsList
        notifications={paginationData.data}
        onSetRead={onSetRead}
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

NotificationsListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSetRead: PropTypes.func.isRequired,
};

export default NotificationsListWithPagination;
