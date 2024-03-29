import React from 'react';
import PropTypes from 'prop-types';
import * as QuizApi from '../../api/quizApi';
import { toast } from 'react-toastify';

const LikeControls = ({ quiz, onLikesUpdated }) => {
  function like() {
    if (quiz.likedByUser) {
      removeLikeOrDislike();
      return;
    }

    QuizApi.likeQuiz(quiz.id)
      .then(() => {
        toast.success('Quiz Liked.');
        onLikesUpdated();
      })
      .catch((error) => {
        toast.error(`Unable to like quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function dislike() {
    if (quiz.dislikedByUser) {
      removeLikeOrDislike();
      return;
    }
    QuizApi.dislikeQuiz(quiz.id)
      .then(() => {
        toast.success('Quiz disliked.');
        onLikesUpdated();
      })
      .catch((error) => {
        toast.error(`Unable to dislike quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function removeLikeOrDislike() {
    QuizApi.removeLikeOrDislike(quiz.id)
      .then(() => {
        onLikesUpdated();
      })
      .catch((error) => {
        toast.error(`Error performing action ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='flex justify-center'>
      <button
        type='button'
        onClick={like}
        className='bg-white py-2 px-4 mr-2 inline-flex items-center'
      >
        <svg
          className={`${
            quiz.likedByUser ? 'text-secondary' : 'text-black'
          } hover:text-secondary h-6 w-6" xmlns="http://www.w3.org/2000/svg`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
          />
        </svg>
        <span className='ml-1'>{quiz.totalLikes}</span>
      </button>
      <button
        type='button'
        onClick={dislike}
        className='bg-white py-2 px-4 mr-2 inline-flex items-center'
      >
        <svg
          className={`${
            quiz.dislikedByUser ? 'text-secondary' : 'text-black'
          } hover:text-secondary h-6 w-6" xmlns="http://www.w3.org/2000/svg`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
          />
        </svg>
        <span className='ml-1'>{quiz.totalDislikes}</span>
      </button>
    </div>
  );
};

LikeControls.propTypes = {
  quiz: PropTypes.object.isRequired,
  onLikesUpdated: PropTypes.func.isRequired,
};

export default LikeControls;
