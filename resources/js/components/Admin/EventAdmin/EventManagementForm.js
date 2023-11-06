import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../FormComponents/TextInput';
import NumberInput from '../../FormComponents/NumberInput';
import MultiSelectInput from '../../FormComponents/MultiSelectInput';
import CheckboxInput from '../../FormComponents/CheckboxInput';

const EventManagementForm = ({
  event,
  tags,
  onSave,
  onChange,
  onTagsChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form>
      <div className='shadow page'>
        <h2 className='font-bold text-primary text-4xl py-4 text-center'>
          {event.id ? 'Edit' : 'Add'} Event
        </h2>
        <div className='p-4'>
          <div className='mb-2'>
            <TextInput
              name='name'
              label='Name'
              value={event.name}
              onChange={onChange}
              error={errors.name}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <TextInput
              name='description'
              label='Description'
              value={event.description}
              onChange={onChange}
              error={errors.description}
              required={true}
            />
          </div>

          <div className='mb-2'>
            <CheckboxInput
              name='universal'
              label='All quizzes are part of this event'
              value={event.universal}
              checked={event.universal}
              onChange={onChange}
            />
          </div>

          {tags && tags.length > 0 && !event.universal && (
            <div className='mb-2'>
              <MultiSelectInput
                name='tags'
                label='Select the tags which will count towards this event'
                value={event.tags}
                options={tags}
                onChange={onTagsChange}
                error={errors.tags}
                helpText={'Complete this text'}
              />
            </div>
          )}

          <div className='mb-2'>
            <NumberInput
              name='score_group_1'
              label='Points for score < 25%'
              value={event.score_group_1}
              onChange={onChange}
              error={errors.score_group_1}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <NumberInput
              name='score_group_2'
              label='Points for score < 50%'
              value={event.score_group_2}
              onChange={onChange}
              error={errors.score_group_2}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <NumberInput
              name='score_group_3'
              label='Points for score < 75%'
              value={event.score_group_3}
              onChange={onChange}
              error={errors.score_group_3}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <NumberInput
              name='score_group_4'
              label='Points for score < 100%'
              value={event.score_group_4}
              onChange={onChange}
              error={errors.score_group_4}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <NumberInput
              name='score_max'
              label='Points for score 100%'
              value={event.score_max}
              onChange={onChange}
              error={errors.score_max}
              required={true}
            />
          </div>
        </div>
      </div>
      <div
        id='manage-event-toolbar'
        className='p-4 grid grid-cols-12 shadow card mt-4'
      >
        <div className='col-span-12 md:col-span-4 mb-2 md:mb-0'>
          {errors.onSave && (
            <div className='text-red-500 text-xs text-center p-1' role='alert'>
              {errors.onSave}
            </div>
          )}
        </div>
        <div className='col-span-12 md:col-span-8'>
          <div className='flex flex-col md:flex-row justify-end'>
            {!event.published && (
              <button
                type='button'
                onClick={() => {
                  onSave(false);
                }}
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
            )}
            <button
              type='button'
              onClick={() => {
                onSave(true);
              }}
              disabled={saving}
              className='bg-primary  text-white rounded text-center py-2 px-4 hover:opacity-75 shadow inline-flex items-center justify-center'
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
              <span className='ml-1'>
                {saving ? 'Publishing...' : 'Save & Publish'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

EventManagementForm.propTypes = {
  event: PropTypes.object.isRequired,
  tags: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saving: PropTypes.bool,
};

export default EventManagementForm;
