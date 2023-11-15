import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import QuizListWithPagination from '../../DisplayComponents/QuizListWithPagination';
import { getQuizzesByUser } from '../../../api/quizApi';
import { getPageWithPaginationUrl } from '../../../api/paginationApi';

const UsersQuizList = ({ user }) => {
  const [quizzesPaginator, setQuizzesPaginator] = useState(null);

  useEffect(() => {
    getQuizzesByUser(user.id)
      .then((quizzesData) => {
        setQuizzesPaginator(quizzesData);
      })
      .catch((error) => {
        toast.error(`Error getting quizzes ${error.message}`, {
          autoClose: false,
        });
      });
  }, [user]);

  function getQuizzesPage(url) {
    getPageWithPaginationUrl(url)
      .then((quizzesData) => {
        setQuizzesPaginator(quizzesData);
      })
      .catch((error) => {
        toast.error(`Error getting quizzes ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='mb-4 px-4 py-2 overflow-hidden shadow card'>
      <h3 className='font-bold text-primary text-2xl text-center md:text-left'>
        Created quizzes
      </h3>
      {quizzesPaginator ? (
        <div>
          {quizzesPaginator.total > 0 ? (
            <QuizListWithPagination
              paginationData={quizzesPaginator}
              onPageChange={getQuizzesPage}
            />
          ) : (
            <p>User has not created any quizzes</p>
          )}
        </div>
      ) : (
        <LoadingMessage message={'Loading users quizzes'} />
      )}
    </div>
  );
};

UsersQuizList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersQuizList;
