import React, { useEffect, useState } from 'react';
import { downloadUsersCSV, searchUsers } from '../../../api/userApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import UsersListWithPagination from '../../DisplayComponents/UsersListWithPagination';
import UserSearchForm from '../../DisplayComponents/UserSearchForm';
import debounce from 'lodash/debounce';
import { getPageWithPaginationUrlAndFilters } from '../../../api/paginationApi';
import { downloadCSVStream } from '../../../tools/HelperFunctions';

const UsersAdminPage = () => {
  const [usersPaginator, setUsersPaginator] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!usersPaginator) {
      search();
    }
  }, [usersPaginator]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [searchTerm]);

  function search() {
    searchUsers(searchTerm)
      .then((usersData) => {
        setUsersPaginator(usersData);
      })
      .catch((error) => {
        toast.error(`Error getting users ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function getUsersWithUrl(url) {
    getPageWithPaginationUrlAndFilters(url, { searchTerm: searchTerm })
      .then((usersData) => {
        setUsersPaginator(usersData);
      })
      .catch((error) => {
        toast.error(`Error getting users ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleSearchTermChange(event) {
    const { name, value } = event.target;
    setSearchTerm(value);
  }

  function saveUserList() {
    downloadUsersCSV()
      .then((data) => {
        downloadCSVStream(data, 'AllUsers.csv');
      })
      .catch((error) => {
        toast.error(`Error getting users list csv ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='users-admin-page'>
      <div className='grid grid-cols-12 pb-4'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0'>
          <div className='px-4 overflow-hidden shadow page mb-4'>
            <h1 className='font-bold text-primary text-4xl my-4 text-center'>
              Admin controls
            </h1>
            <p className='my-4'>
              Search, view, and administer registered users.
            </p>
          </div>
          <div className='px-4 overflow-hidden shadow page mb-4'>
            <h1 className='font-bold text-primary text-4xl my-4 text-center'>
              Search
            </h1>
            <UserSearchForm
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchTermChange}
            />
          </div>
          <div>
            <button
              onClick={() => saveUserList()}
              className='w-full justify-center center-text bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center'
            >
              <svg
                className='text-white h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25'
                />
              </svg>
              <p className='ml-1'>Download Users CSV</p>
            </button>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-9'>
          <div className='overflow-hidden shadow page px-4'>
            {!usersPaginator ? (
              <LoadingMessage message={'Loading users'} />
            ) : (
              <>
                <h1 className='font-bold text-primary text-4xl my-4 text-center'>
                  Users
                </h1>
                {usersPaginator.total > 0 ? (
                  <UsersListWithPagination
                    paginationData={usersPaginator}
                    onPageChange={getUsersWithUrl}
                  />
                ) : (
                  <p className='text-center'>
                    There are currently no users added.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAdminPage;
