import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import { getScoresForUser } from '../../../api/userApi';
import ScoresTableWithPagination from '../../DisplayComponents/ScoresTableWithPagination';
import { getPageWithPaginationUrl } from '../../../api/paginationApi';

const UsersBestScoresList = ({ user }) => {
  const [scoresPaginator, setScoresPaginator] = useState(null);

  useEffect(() => {
    getUserScores();
  }, [user]);

  function getUserScores() {
    getScoresForUser(user.id)
      .then((scoreData) => {
        setScoresPaginator(scoreData);
      })
      .catch((error) => {
        toast.error(`Error getting user scores ${error.message}`, {
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
        toast.error(`Error getting user scores ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='px-4 py-2 overflow-hidden shadow card'>
      <h3 className='font-bold text-primary text-2xl text-center md:text-left'>
        {user.username} Best Scores
      </h3>
      {scoresPaginator ? (
        <div>
          {scoresPaginator.total > 0 ? (
            <ScoresTableWithPagination
              paginationData={scoresPaginator}
              onPageChange={getScoresPage}
              showUser={false}
              showQuiz={true}
            />
          ) : (
            <p>User has not got any scores to show</p>
          )}
        </div>
      ) : (
        <LoadingMessage message={'Loding users scores'} />
      )}
    </div>
  );
};

UsersBestScoresList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersBestScoresList;
