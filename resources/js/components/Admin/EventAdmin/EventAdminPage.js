import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import EventsListWithPagination from '../../DisplayComponents/EventsListWithPagination';
import { Link } from 'react-router-dom';
import { getPageWithPaginationUrl } from '../../../api/paginationApi';
import { getEvents } from '../../../api/eventApi';

const EventsAdminPage = () => {
  const [eventsPaginator, setEventsPaginator] = useState(null);
  useEffect(() => {
    if (!eventsPaginator) {
      getEvents()
        .then((eventsData) => {
          setEventsPaginator(eventsData);
        })
        .catch((error) => {
          toast.error(`Error getting events ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [eventsPaginator]);

  function getEventsPage(url) {
    getPageWithPaginationUrl(url)
      .then((eventsData) => {
        setEventsPaginator(eventsData);
      })
      .catch((error) => {
        toast.error(`Error getting events ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='events-admin-page'>
      <div className='grid grid-cols-12 pb-4'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0'>
          <div className='px-4 pb-4 overflow-hidden shadow card'>
            <h1 className='font-bold text-primary text-primary text-4xl my-4 text-center'>
              Admin controls
            </h1>
            <p className='my-4'>Add some text here.</p>
            <div className='flex flex-col justify-center text-center'>
              <Link
                to={`/admin/events/create`}
                className='border border-gray-800 text-gray-800 font-bold text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center'
              >
                <svg
                  className='text-secondary h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
                <span className='ml-1'>Add Event</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-9 overflow-hidden shadow page px-4'>
          {!eventsPaginator ? (
            <LoadingMessage message={'Loading events'} />
          ) : (
            <>
              <h1 className='font-bold text-primary text-4xl my-4 text-center'>
                Events
              </h1>
              {eventsPaginator.total > 0 ? (
                <EventsListWithPagination
                  paginationData={eventsPaginator}
                  onPageChange={getEventsPage}
                />
              ) : (
                <p className='text-center'>
                  There are currently no events added.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsAdminPage;
