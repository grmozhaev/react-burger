import React, { ChangeEvent } from 'react';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';

import './forgot-password.css';
import './profile.css';

export const ProfilePage = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
            type={'text'}
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
      </div>
    </div>
  );
};
