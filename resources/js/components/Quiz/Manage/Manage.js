import React, { useCallback, useEffect, useState } from 'react';
import { newQuiz } from '../../../tools/objectShapes';
import QuizForm from './QuizForm';
import { getQuizForEdit, saveQuiz } from '../../../api/quizApi';
import { getTags } from '../../../api/tagsApi';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import * as QuizManagementService from '../../../tools/QuizManagementService';
import _ from 'lodash';
import { getPotentialCollaboratorsList } from '../../../api/friendsApi';
import { Prompt } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

const QuizManagementPage = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState({ ...newQuiz });
  const [tags, setTags] = useState(null);
  const [collaborators, setCollaborators] = useState(null);
  const [errors, setErrors] = useState({ questions: [] });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const formatBlankErrorObjects = useCallback(() => {
    if (errors.questions.length > 0)
      updateErrors(QuizManagementService.addBlankErrorsForQuestion(errors));
  }, [errors]);

  useEffect(() => {
    if (quizId) {
      getQuizForEdit(quizId)
        .then((data) => {
          setQuiz({ ...data });
          setEditing(true);
        })
        .catch((error) => {
          toast.error(`Error fetching quiz to edit ${error.message}`, {
            autoClose: false,
          });
        });
    } else {
      setQuiz(_.cloneDeep(newQuiz));
      formatBlankErrorObjects();
    }
  }, [quizId, formatBlankErrorObjects]);

  useEffect(() => {
    if (!tags) {
      getTags().then((tags) => {
        setTags(tags);
      });
    }
  }, [tags]);

  useEffect(() => {
    if (!collaborators) {
      getPotentialCollaboratorsList().then((collaborators) => {
        setCollaborators(collaborators);
      });
    }
  }, [collaborators]);

  function formIsValid() {
    var validated = QuizManagementService.validateQuiz(quiz);
    setErrors({ ...validated.errors });
    return validated.isValid;
  }

  function handleSave(publish) {
    if (!formIsValid()) return;
    setSaving(true);

    let quizToPost = { ...quiz };
    quizToPost.publish = publish;

    quizToPost.tags = quizToPost.tags.map((tag) => tag.value);
    quizToPost.collaborators = quizToPost.collaborators.map(
      (collaborator) => collaborator.value,
    );

    saveQuiz(quizToPost)
      .then((response) => {
        toast.success(`Quiz ${publish ? 'published' : 'saved'}`);
        history.push(`/quiz/${response.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error ${publish ? 'publishing' : 'saving'} quiz`, {
          autoClose: false,
        });
        let tempErrors = { ...errors };
        tempErrors.onSave = err.message;
        setErrors({ ...tempErrors });
      });
  }

  function updateQuiz(quiz) {
    setQuiz({ ...quiz });
  }

  function updateErrors(errors) {
    setErrors({ ...errors });
  }

  function handleReset() {
    confirmAlert({
      title: 'Confirm reset',
      message: `Are you sure you want to reset?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setQuiz({ ...QuizManagementService.resetQuiz(quiz) });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <div className='quiz-management-page container mx-auto'>
      {quiz && tags && collaborators ? (
        <>
          <Prompt
            when={!saving}
            message={`Are you sure you want to leave? All ${
              editing ? 'changes' : 'progress'
            } will be lost.`}
          />
          <QuizForm
            quiz={quiz}
            tags={tags}
            collaborators={collaborators}
            errors={errors}
            updateQuiz={updateQuiz}
            updateErrors={updateErrors}
            onReset={handleReset}
            onSave={handleSave}
            saving={saving}
            editing={editing}
          />
        </>
      ) : (
        <div className='shadow page'>
          <LoadingMessage message={'Loading form'} />
        </div>
      )}
    </div>
  );
};

export default QuizManagementPage;
