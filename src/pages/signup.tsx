import React, { useCallback, ChangeEvent } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { createUser } from '../services/api';

import './forgot-password.css';

export const SignupPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const history = useHistory();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSignup = useCallback(async () => {
    try {
      await createUser(name, email, password);
      history.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }, [email, history, name, password]);

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">
        Регистрация
      </p>
      <div className="align-forms mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onNameChange}
          value={name}
          name={'name'}
        />
      </div>
      <div className="align-forms mb-6">
        <EmailInput onChange={onEmailChange} value={email} name={'email'} />
      </div>
      <div className="align-forms mb-6">
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={'password'}
        />
      </div>
      <div className="button">
        <Button type="primary" onClick={onSignup}>Зарегистрироваться</Button>
      </div>
      <div className="links-container">
        <p className="text text_type_main-default mt-20 mb-4">
          Уже зарегистрированы?{' '}
          <Link to="/login" className="link-decoration">
            <span className="text text_type_main-default link-color">
              Войти
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
