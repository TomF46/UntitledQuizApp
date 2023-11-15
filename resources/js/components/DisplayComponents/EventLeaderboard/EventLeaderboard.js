import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from '../LoadingMessage';
import EventLeaderboardTableWithPagination from './EventLeaderboardTableWithPagination';
import { getEventLeaderboard } from '../../../api/eventApi';
import { getPageWithPaginationUrl } from '../../../api/paginationApi';
import { toast } from 'react-toastify';

const EventLeaderboard = ({ event }) => {
  const [scoresPaginator, setScores] = useState(null);

  useEffect(() => {
    getEventLeaderboard(event.id)
      .then((scores) => {
        setScores(scores);
      })
      .catch((error) => {
        toast.error(`Error getting event scores ${error.message}`, {
          autoClose: false,
        });
      });
  }, [event]);

  function getScoresPage(url) {
    getPageWithPaginationUrl(url)
      .then((scoreData) => {
        setScores(scoreData);
      })
      .catch((error) => {
        toast.error(`Error getting event scores ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='inline-block p-4 min-w-full'>
      <h2 className='font-bold text-primary text-2xl mb-4 text-center'>
        {event.name} leaderboard
      </h2>
      {!scoresPaginator ? (
        <LoadingMessage message={'Loading scores'} />
      ) : (
        <EventLeaderboardTableWithPagination
          paginationData={scoresPaginator}
          onPageChange={getScoresPage}
        />
      )}
    </div>
  );
};

EventLeaderboard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventLeaderboard;
