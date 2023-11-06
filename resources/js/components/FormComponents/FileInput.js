import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ name, label, onChange, error }) => {
  return (
    <div className='field'>
      <label
        className='block mb-1 font-bold text-xs text-gray-700'
        htmlFor={name}
      >
        {label}
      </label>
      <div className='control'>
        <input
          type='file'
          name={name}
          className='border border-gray-400 p-2 w-full'
          onChange={onChange}
        />
        {error && <div className='text-red-500 text-xs p-1 mt-2'>{error}</div>}
      </div>
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FileInput;
