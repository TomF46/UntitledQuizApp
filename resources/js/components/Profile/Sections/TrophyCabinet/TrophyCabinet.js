import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PaginationControls from '../../../DisplayComponents/PaginationControls';
import { useHistory } from 'react-router-dom';

const TrophyCabinet = ({ trophies }) => {
  const history = useHistory();
  const [groups, setGroups] = useState(null);
  const [viewingIndex, setViewingIndex] = useState(0);

  useEffect(() => {
    if (trophies.length > 0) {
      let tempGroups = [];
      let size = 4;
      for (let i = 0; i < trophies.length; i += size) {
        tempGroups.push(trophies.slice(i, i + size));
      }
      setGroups(tempGroups);
    }
  }, [trophies]);

  function getTrophyColorClass(trophy) {
    switch (trophy.tier) {
      case 0:
        return 'text-yellow-400';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-yellow-800';
      default:
        return 'text-secondary';
    }
  }

  function handleGoBack() {
    if (viewingIndex == 0) return;
    let newIndex = viewingIndex - 1;
    setViewingIndex(newIndex);
  }

  function handleGoForward() {
    if (viewingIndex == groups.length - 1) return;
    let newIndex = viewingIndex + 1;
    setViewingIndex(newIndex);
  }

  function viewEvent(eventId) {
    history.push(`/events/${eventId}`);
  }

  return (
    <div className='trophyCabinet'>
      {groups && (
        <div className='mb-4 px-4 py-2 overflow-hidden shadow card'>
          <h3 className='font-bold text-primary text-2xl text-center md:text-left'>
            Trophies
          </h3>
          <div className='grid grid-cols-12'>
            {groups[viewingIndex].map((trophy) => {
              return (
                <div
                  key={trophy.id}
                  className='col-span-3 pointer'
                  onClick={() => {
                    viewEvent(trophy.event_id);
                  }}
                >
                  <div className='my-4'>
                    <svg
                      className={`${getTrophyColorClass(
                        trophy,
                      )} center-svg w-16 h-16`}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0'
                      />
                    </svg>
                  </div>
                  <h2 className='font-bold text-primary text-lg pb-4 text-center'>
                    {trophy.name}
                  </h2>
                </div>
              );
            })}
          </div>
          <div className='pagination-controls p-2'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm text-secondary'>{`Showing page ${
                  viewingIndex + 1
                } of ${groups.length}`}</p>
              </div>
              <div>
                {viewingIndex > 0 && (
                  <button
                    type='button'
                    onClick={handleGoBack}
                    className='rounded mr-2 inline-flex items-center pointer text-secondary hover:opacity-75'
                  >
                    <svg
                      className='h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
                      />
                    </svg>
                    <span className='ml-1'>Previous</span>
                  </button>
                )}
                {viewingIndex + 1 != groups.length && (
                  <button
                    type='button'
                    onClick={handleGoForward}
                    className='rounded inline-flex items-center pointer text-secondary hover:opacity-75'
                  >
                    <svg
                      className='h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='ml-1'>Next</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TrophyCabinet.propTypes = {
  trophies: PropTypes.array.isRequired,
};

export default TrophyCabinet;
