import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const LoadingMessage = ({ message }) => {
  return (
    <div className='flex justify-center pt-4'>
      <div>
        <LoadingSpinner />
        {message != null && <p className='text-center my-4'>{message}</p>}
      </div>
    </div>
  );
};

LoadingMessage.propTypes = {
  message: PropTypes.string,
};

export default LoadingMessage;
