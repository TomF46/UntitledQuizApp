import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SmallUsersList = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className='grid grid-cols-12 p-1 border-b border-gray-200 overflow-hidden'
          >
            <div className='col-span-4 inline-flex items-center'>
              <img
                src={user.profile_image}
                alt='profile-picture'
                className='rounded-full h-10 w-10'
              />
            </div>
            <div className='col-span-8 flex'>
              <Link
                to={`/profile/${user.id}`}
                className='font-bold text-secondary pointer vertical-centered-text'
              >
                {user.username}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

SmallUsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default SmallUsersList;
