import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import ChallengeList from './ChallengeList';

const ChallengeListWithPagination = ({ paginationData, onPageChange }) => {
  return (
    <div className='challenge-list-w-pagination'>
      <ChallengeList challenges={paginationData.data} />
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

ChallengeListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ChallengeListWithPagination;
