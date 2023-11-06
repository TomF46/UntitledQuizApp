import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getLiveEvents } from '../../../api/eventApi';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import SmallEventList from '../../DisplayComponents/SmallEventsList';

const LiveEventsList = () => {
  const [eventsPaginator, setEventsPaginator] = useState(null);
  useEffect(() => {
    if (!eventsPaginator) {
      getLiveEvents()
        .then((eventsData) => {
          setEventsPaginator(eventsData);
        })
        .catch((error) => {
          toast.error(`Error getting live events ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [eventsPaginator]);

  return (
    <div className='live-events-dashboard px-4 py-2'>
      {eventsPaginator == null ? (
        <LoadingMessage message={'Loading live events'} />
      ) : (
        <div>
          <h1 className='font-bold text-primary text-2xl text-center'>
            Live events
          </h1>
          {eventsPaginator.total > 0 ? (
            <SmallEventList events={eventsPaginator.data} />
          ) : (
            <p>There are currently no live events.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveEventsList;
