import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../DisplayComponents/LoadingMessage';
import { confirmAlert } from 'react-confirm-alert';
import {
  getFriendsList,
  getFriendRequestsList,
  removeOrRejectFriend,
  acceptFriendRequest,
} from '../../api/friendsApi';
import FriendsListWithPagination from './FriendsList/FriendsListWithPagination';
import { getPageWithPaginationUrl } from '../../api/paginationApi';
import FriendRequestsListWithPagination from './FriendRequestsList/FriendRequestsListWithPagination';

const FriendsPage = () => {
  const [friendsPaginator, setFriendsPaginator] = useState(null);
  const [friendRequestsPaginator, setFriendRequestsPaginator] = useState(null);

  useEffect(() => {
    if (!friendsPaginator) {
      getFriends();
    }
    if (!friendRequestsPaginator) {
      getFriendRequests();
    }
  }, [friendsPaginator, friendRequestsPaginator]);

  function getFriends() {
    getFriendsList()
      .then((friendsData) => {
        setFriendsPaginator(friendsData);
      })
      .catch((error) => {
        toast.error(`Error getting friends ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function getFriendRequests() {
    getFriendRequestsList()
      .then((friendRequestsData) => {
        setFriendRequestsPaginator(friendRequestsData);
      })
      .catch((error) => {
        toast.error(`Error getting friend requests ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleRemoveOrRejectFriend(id) {
    confirmAlert({
      title: 'Confirm action',
      message: `Are you sure you want to do this?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            removeOrRejectFriend(id)
              .then(() => {
                getFriends();
                getFriendRequests();
              })
              .catch((error) => {
                toast.error(`Error remove or rejecting ${error.message}`, {
                  autoClose: false,
                });
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function handleAcceptFriendRequest(id) {
    acceptFriendRequest(id)
      .then(() => {
        getFriends();
        getFriendRequests();
      })
      .catch((error) => {
        toast.error(`Error accepting request ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleFriendListPageChange(url) {
    getPageWithPaginationUrl(url)
      .then((friendsData) => {
        setFriendsPaginator(friendsData);
      })
      .catch((error) => {
        toast.error(`Error getting friends ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleFriendRequestsListPageChange(url) {
    getPageWithPaginationUrl(url)
      .then((friendRequestsData) => {
        setFriendRequestsPaginator(friendRequestsData);
      })
      .catch((error) => {
        toast.error(`Error getting friend requests ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='Friends-page'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow page'>
          <h1 className='font-bold text-primary text-4xl my-4 text-center'>
            Details
          </h1>
          <p>
            On this page you can view and manage your friends list as well as
            see and respond to any pending friend requests.
          </p>
          <p className='mt-4'>
            Friends offer improved social interaction between users over just
            following each other. Upcoming features such as collaboratively
            managed quizzes will take advantage of this.
          </p>
        </div>
        <div className='col-span-12 lg:col-span-9'>
          <div className='mb-6 overflow-hidden shadow card px-4 py-2'>
            <h1 className='font-bold text-primary text-primary text-2xl text-center md:text-left'>
              Friend Requests
            </h1>
            {!friendRequestsPaginator ? (
              <LoadingMessage message={'Loading friend requests'} />
            ) : friendRequestsPaginator.total > 0 ? (
              <FriendRequestsListWithPagination
                paginationData={friendRequestsPaginator}
                onPageChange={handleFriendRequestsListPageChange}
                onAccept={handleAcceptFriendRequest}
                onRemove={handleRemoveOrRejectFriend}
              />
            ) : (
              <p>You do not currently have any friend requests.</p>
            )}
          </div>
          <div className='overflow-hidden shadow card px-4 py-2'>
            <h1 className='font-bold text-primary text-primary text-2xl text-center md:text-left'>
              Friends
            </h1>
            {!friendsPaginator ? (
              <LoadingMessage message={'Loading friends'} />
            ) : friendsPaginator.total > 0 ? (
              <FriendsListWithPagination
                paginationData={friendsPaginator}
                onPageChange={handleFriendListPageChange}
                onRemove={handleRemoveOrRejectFriend}
              />
            ) : (
              <p>You do not currently have any friends.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
