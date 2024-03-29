import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import TagList from './TagList';

const TagsListWithPagination = ({ paginationData, onPageChange, onDelete }) => {
  return (
    <div className='tags-list-w-pagination'>
      <TagList tags={paginationData.data} onDelete={onDelete} />
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

TagsListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TagsListWithPagination;
