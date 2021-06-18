import React, { ChangeEvent, useCallback, useEffect } from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';
import { useDispatch } from 'react-redux';

import './forgot-password.css';
import './profile.css';
import { getUser } from '../services/api';
import { editUserInfo } from '../services/actions/auth';

export const ProfilePage = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
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

  const handleSaveChange = useCallback(() => {
    dispatch(editUserInfo(name, login, password));
  }, [dispatch, name, login, password]);

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <div className="profile-input-fields ml-15">
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
            <Button type="primary" onClick={handleSaveChange}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
