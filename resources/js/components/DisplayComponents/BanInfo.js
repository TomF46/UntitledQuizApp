import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBan } from '../../api/banApi';
import { toast } from 'react-toastify';
import LoadingMessage from './LoadingMessage';

const BanInfo = ({ banId }) => {
  const [ban, setBan] = useState(null);

  useEffect(() => {
    if (!ban) {
      getBanData();
    }
  }, [banId, ban]);

  function getBanData() {
    getBan(banId)
      .then((banData) => {
        setBan(banData);
      })
      .catch((error) => {
        toast.error(`Error getting ban information ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div>
      <div className='flex justify-center'>
        <div className='inline-block p-4 border-b min-w-full'>
          <h2 className='font-bold text-primary text-2xl mb-4 text-center'>
            This quiz is banned
          </h2>
          {!ban ? (
            <LoadingMessage message={'Loading ban information'} />
          ) : (
            <div>
              <p className='text-center'>
                The quiz &apos;{ban.quizTitle}&apos; has been banned for the
                following reason: {ban.reason}{' '}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BanInfo.propTypes = {
  banId: PropTypes.number.isRequired,
};

export default BanInfo;
