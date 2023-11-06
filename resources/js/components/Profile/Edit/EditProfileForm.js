import React from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../../FormComponents/TextAreaInput';
import TextInput from '../../FormComponents/TextInput';
import FileInput from '../../FormComponents/FileInput';

const EditProfileForm = ({
  user,
  onChange,
  onFileChange,
  onSave,
  errors = {},
  saving = false,
}) => {
  return (
    <form className='' onSubmit={onSave}>
      <h2 className='font-bold text-primary text-4xl py-4 text-center'>
        Edit your profile
      </h2>
      {errors.onSave && (
        <div className='text-red-500 text-xs p-1' role='alert'>
          {errors.onSave}
        </div>
      )}
      <div className='p-4'>
        <div className='mb-2'>
          <img
            src={user.profile_image}
            alt='profile-picture-preview'
            className='rounded-full profile-photo profile-photo-preview'
          />
        </div>
        <div className='mb-2 flex justify-center'>
          <button
            type='button'
            className='bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>

            <label className='pointer ml-1'>
              Upload Profile Image
              <input
                type='file'
                name={'profile_image'}
                className=' border-gray-400 p-2 w-full hidden'
                onChange={onFileChange}
              />
            </label>
          </button>
        </div>
        <div className='mb-2'>
          <TextInput
            name='username'
            label='User'
            value={user.username}
            onChange={onChange}
            error={errors.username}
            required={true}
          />
        </div>
        <div className='mb-2'>
          <TextAreaInput
            name='bio'
            label='Bio'
            value={user.bio}
            required={false}
            onChange={onChange}
            error={errors.bio}
          />
        </div>
      </div>
      <div
        id='manage-profile-toolbar'
        className='px-4 mt-2 flex justify-between items-center'
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
            className='bg-primary  text-white rounded text-center py-2 px-4 hover:opacity-75 md:mr-2 shadow inline-flex items-center justify-center'
          >
            <svg
              className='text-white h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
              />
            </svg>
            <span className='ml-1'>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

EditProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default EditProfileForm;
