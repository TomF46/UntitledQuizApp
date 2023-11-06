import React from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../../FormComponents/TextAreaInput';

const QuizBanForm = ({
  quiz,
  reason,
  onChange,
  onSave,
  errors = {},
  saving = false,
}) => {
  return (
    <form className='' onSubmit={onSave}>
      <h2 className='font-bold text-primary text-4xl my-4 text-center'>
        Ban {quiz.title}
      </h2>
      {errors.onSave && (
        <div className='text-red-500 text-xs p-1' role='alert'>
          {errors.onSave}
        </div>
      )}
      <div className='p-4'>
        <div className='mb-6'>
          <TextAreaInput
            name='reason'
            label='Reason'
            value={reason}
            required={true}
            onChange={onChange}
            error={errors.reason}
          />
        </div>
      </div>
      <div
        id='quiz-ban-toolbar'
        className='p-4 flex justify-between items-center'
      >
        <div className='flex'></div>
        <div className='flex'>
          {errors.onSave && (
            <div className='text-red-500 text-xs p-1' role='alert'>
              {errors.onSave}
            </div>
          )}
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={saving}
            className='bg-red-800 text-white rounded py-2 px-4 hover:bg-red-600 shadow'
          >
            {saving ? 'Banning...' : 'Ban'}
          </button>
        </div>
      </div>
    </form>
  );
};

QuizBanForm.propTypes = {
  quiz: PropTypes.object.isRequired,
  reason: PropTypes.string.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default QuizBanForm;
