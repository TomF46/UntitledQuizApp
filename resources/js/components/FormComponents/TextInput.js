import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  required,
  error,
}) => {
  return (
    <div className='field'>
      {label && (
        <label
          className='block mb-1 font-bold text-xs text-gray-700'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className='control'>
        <input
          type='text'
          name={name}
          className='border border-gray-400 p-2 w-full'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete='off'
        />
        {error && <div className='text-red-500 text-xs p-1 mt-2'>{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TextInput;
