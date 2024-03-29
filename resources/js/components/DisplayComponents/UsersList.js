import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className='grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden'
          >
            <div className='col-span-2 lg:col-span-1 inline-flex items-center'>
              <img
                src={user.profile_image}
                alt='profile-picture'
                className='rounded-full h-10 w-10'
              />
            </div>
            <div className='col-span-6 lg:col-span-4'>
              <p className='text-sm text-gray-600'>Name:</p>
              <Link
                to={`/profile/${user.id}`}
                className='font-bold text-secondary items-center pointer'
              >
                {user.username}
              </Link>
            </div>
            <div className='hidden lg:block col-span-2'>
              <p className='text-sm text-gray-600'>Quizzes created:</p>
              <p>{user.totalQuizzesCreated}</p>
            </div>
            <div className='hidden lg:inline-flex col-span-2 items-center'>
              <svg
                className={`text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <p className='ml-1'>{user.followerCount} followers</p>
            </div>
            <div className='col-span-4 lg:col-span-3 flex justify-end'>
              {/* <Link
                                to={`/profile/${user.id}`}
                                className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-block align-middle shadow"
                            >
                                Profile
                            </Link> */}
              <Link
                to={`/profile/${user.id}`}
                className='bg-primary  text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center ml-2'
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
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                <p className='ml-1'>Profile</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersList;
