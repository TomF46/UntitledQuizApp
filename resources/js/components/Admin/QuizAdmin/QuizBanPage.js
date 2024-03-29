import React, { useEffect, useState } from 'react';
import { getQuiz, ban } from '../../../api/quizApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import QuizBanForm from './QuizBanForm';
import { useParams, useHistory } from 'react-router-dom';

const QuizBanPage = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState(null);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getQuiz(quizId)
      .then((quizData) => {
        setQuiz(quizData);
      })
      .catch((error) => {
        toast.error(`Error getting quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }, [quizId]);

  function handleChange(event) {
    const { value } = event.target;

    setReason(value);
  }

  function formIsValid() {
    const errors = {};
    if (!reason) errors.reason = 'A reason for banning is required.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    ban(quiz.id, reason)
      .then(() => {
        toast.success('Quiz banned');
        history.push(`/quiz/${quiz.id}`);
      })
      .catch((error) => {
        toast.error(`Error banning quiz ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='pt-6 overflow-hidden shadow page'>
      {!quiz ? (
        <LoadingMessage message={'Loading quiz'} />
      ) : (
        <QuizBanForm
          quiz={quiz}
          reason={reason}
          onChange={handleChange}
          errors={errors}
          saving={saving}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default QuizBanPage;
