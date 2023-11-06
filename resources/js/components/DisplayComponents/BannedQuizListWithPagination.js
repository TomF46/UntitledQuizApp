import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import BannedQuizList from './BannedQuizList';

const BannedQuizListWithPagination = ({
  paginationData,
  onPageChange,
  onQuizUnban,
}) => {
  return (
    <div className='quiz-list-w-pagination'>
      <BannedQuizList quizzes={paginationData.data} onQuizUnban={onQuizUnban} />
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

BannedQuizListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onQuizUnban: PropTypes.func.isRequired,
};

export default BannedQuizListWithPagination;
