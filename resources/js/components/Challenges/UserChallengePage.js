import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getScoresForUser, getUserById } from '../../api/userApi';
import LoadingMessage from '../DisplayComponents/LoadingMessage';
import ChallengeScoresTableWithPagination from '../DisplayComponents/ChallengeScoresTableWithPagination';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { sendChallenge } from '../../api/challengesApi';
import { getPageWithPaginationUrl } from '../../api/paginationApi';
import { useParams, useHistory } from 'react-router-dom';

const UserChallengesPage = () => {
  const currentUser = useSelector((state) => state.tokens.user_id);
  const { userId } = useParams();
  const history = useHistory();
  const [recipient, setRecipient] = useState(null);
  const [scoresPaginator, setScoresPaginator] = useState(null);

  useEffect(() => {
    if (!recipient || recipient.id != userId) {
      getUserById(userId)
        .then((userData) => {
          setRecipient(userData);
        })
        .catch((error) => {
          toast.error(`Error getting user ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [userId, recipient]);

  useEffect(() => {
    getCurrentUserScores();
  }, currentUser);

  function getCurrentUserScores() {
    getScoresForUser(currentUser)
      .then((scoreData) => {
        setScoresPaginator(scoreData);
      })
      .catch((error) => {
        toast.error(`Error getting current users scores ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function getScoresPage(url) {
    getPageWithPaginationUrl(url)
      .then((scoreData) => {
        setScoresPaginator(scoreData);
      })
      .catch((error) => {
        toast.error(`Error getting current users scores ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function handleScoreSelected(score) {
    confirmAlert({
      title: 'Confirm challenge',
      message: `Are you sure you want to challenge ${recipient.username} with this score?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => sendChallengeToApi(score),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function sendChallengeToApi(score) {
    sendChallenge(recipient.id, score.id)
      .then(() => {
        toast.success('Challenge sent');
        history.push(`/challenges`);
      })
      .catch(() => {
        toast.error('Error sending challenge, please try again', {
          autoClose: false,
        });
      });
  }

  return (
    <div className='user-challenge-page'>
      {recipient == null ? (
        <LoadingMessage message={'Loading user to challenge'} />
      ) : (
        <div className='grid grid-cols-12 pb-4'>
          <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0'>
            <div className='px-4 overflow-hidden shadow page mb-4'>
              <h3 className='text-4xl font-bold text-center text-primary my-4'>
                Challenge
              </h3>
              <p>
                Choose one of your own scores from the list to challenge{' '}
                {recipient.username}, they must match or beat your score to
                succeed
              </p>
            </div>
            <div className='px-4 overflow-hidden shadow page'>
              <h2 className='font-bold text-primary text-4xl py-4 text-center'>
                {recipient.username}
              </h2>
              <div>
                <img
                  src={recipient.profile_image}
                  alt='profile-picture'
                  className='rounded-full profile-photo'
                />
              </div>
              <div className='text-center my-4'>
                <h3 className='text-lg font-bold'>User Info</h3>
                <p>Username: {recipient.username}</p>
                <p>Email: {recipient.email}</p>
                <p>Quizzes created: {recipient.totalQuizzesCreated}</p>
              </div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-9'>
            <div className='px-4 overflow-hidden shadow page'>
              <div className='flex'>
                <div className='mb-4'>
                  <h3 className='font-bold text-primary text-4xl text-center my-4'>
                    Your scores
                  </h3>
                  {!scoresPaginator ? (
                    <div className='flex justify-center'>
                      <LoadingMessage message={'Loading your scores'} />
                    </div>
                  ) : (
                    <ChallengeScoresTableWithPagination
                      paginationData={scoresPaginator}
                      onPageChange={getScoresPage}
                      onScoreSelected={handleScoreSelected}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChallengesPage;
