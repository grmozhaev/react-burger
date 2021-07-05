import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/api';
import { editUserInfo } from '../../services/actions/auth';

import '../forgot-password/forgot-password.css';
import './profile.css';

export const ProfilePage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        setName(res.name);
        setLogin(res.email);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleFormReset = useCallback(() => {
    getUser()
      .then((res) => {
        setName(res.name);
        setLogin(res.email);
      })
      .catch((err) => console.error(err));
    setPassword('');
  }, []);

  const handleSaveChange = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        dispatch(editUserInfo(name, login, password));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, name, login, password]
  );

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <form className="profile-input-fields ml-15" onSubmit={handleSaveChange}>
        <div className="mb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onNameChange}
            value={name}
            name={'name'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={onLoginChange}
            value={login}
            name={'name'}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name={'password'}
          />
        </div>
        <div className="buttons-container">
          <div className="button">
            <Button type="secondary" onClick={handleFormReset}>
              Отмена
            </Button>
          </div>
          <div className="button">
            <Button type="primary">Сохранить</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
