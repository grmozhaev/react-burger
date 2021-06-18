import React, { useState, useCallback, ChangeEvent } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { signin } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../services/reducers';

import './forgot-password.css';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isUserLoaded } = useSelector((store: AppState) => store.auth);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSignin = useCallback(() => {
    try {
      dispatch(signin(email, password));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, email, password]);

  if (isUserLoaded) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">Вход</p>
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
        <Button type="primary" onClick={onSignin}>
          Войти
        </Button>
      </div>
      <div className="links-container">
        <p className="text text_type_main-default mt-20 mb-4">
          Вы — новый пользователь?{' '}
          <Link to="/register" className="link-decoration">
            <span className="text text_type_main-default link-color__violet">
              Зарегистрироваться
            </span>
          </Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className="link-decoration">
            <span className="text text_type_main-default link-color__violet">
              Восстановить пароль
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
