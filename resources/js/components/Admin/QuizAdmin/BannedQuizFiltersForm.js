import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../FormComponents/TextInput';

const BannedQuizFiltersForm = ({ filters, onFilterChange }) => {
  return (
    <div>
      <div className='mb-4'>
        <TextInput
          name='searchTerm'
          label='Title'
          value={filters.searchTerm}
          onChange={onFilterChange}
          required={false}
        />
      </div>
      <div className='mb-4'>
        <TextInput
          name='user'
          label='User'
          value={filters.user}
          onChange={onFilterChange}
          required={false}
        />
      </div>
    </div>
  );
};

BannedQuizFiltersForm.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default BannedQuizFiltersForm;
