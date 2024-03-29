import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPageWithPaginationUrl } from '../../../api/paginationApi';
import { getFollowedUsers } from '../../../api/userApi';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import SmallUsersListWithPagination from '../../DisplayComponents/SmallUsersListWithPagination';

const FollowedUsersList = () => {
  const [usersPaginator, setUsers] = useState(null);

  useEffect(() => {
    if (!usersPaginator) {
      getFollowedUsers()
        .then((usersData) => {
          setUsers(usersData);
        })
        .catch((error) => {
          toast.error(`Error getting users ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [usersPaginator]);

  function getUsersPage(url) {
    getPageWithPaginationUrl(url)
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        toast.error(`Error getting users ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='users-following-dashboard px-4 py-2'>
      {usersPaginator == null ? (
        <LoadingMessage message={'Loading followed users dashboard'} />
      ) : (
        <div>
          <h1 className='font-bold text-primary text-2xl text-center'>
            People you follow
          </h1>
          {usersPaginator.total > 0 ? (
            <div>
              <SmallUsersListWithPagination
                paginationData={usersPaginator}
                onPageChange={getUsersPage}
              />
            </div>
          ) : (
            <p>You dont currently follow any users.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowedUsersList;
