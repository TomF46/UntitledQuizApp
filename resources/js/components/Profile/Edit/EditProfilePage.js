import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserForEditing, editUserProfile } from '../../../api/userApi';
import EditProfileForm from './EditProfileForm';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import { storeImage } from '../../../api/imagesApi';
import { Prompt, useHistory } from 'react-router-dom';

const EditProfilePage = () => {
  const userId = useSelector((state) => state.tokens.user_id);
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      getUserForEditing(userId)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          toast.error(`Error getting user ${error.message}`, {
            autoClose: false,
          });
        });
    }
  }, [userId, user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    let file = event.target.files[0];
    toast.info('Uploading image');
    storeImage(file)
      .then((res) => {
        toast.success('Sucessfully uploaded image');
        setUser((prevUser) => ({
          ...prevUser,
          profile_image: res.path,
        }));
      })
      .catch(() => {
        toast.error('Unable to uploaded image');
      });
  }

  function formIsValid() {
    const { username } = user;
    const errors = {};
    if (!username) errors.username = 'Username is required.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    editUserProfile(userId, user)
      .then(() => {
        toast.success('Profile updated!');
        history.push('/profile');
      })
      .catch((error) => {
        toast.error(`Error updating profile ${error.message}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className='shadow page'>
      {user == null ? (
        <LoadingMessage message={'Loading user'} />
      ) : (
        <>
          <Prompt
            when={!saving}
            message='Are you sure you want to leave? All changes will be lost.'
          />
          <EditProfileForm
            user={user}
            onChange={handleChange}
            onFileChange={handleFileChange}
            errors={errors}
            saving={saving}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
};

export default EditProfilePage;
