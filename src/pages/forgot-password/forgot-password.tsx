import React, { useCallback, ChangeEvent } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../services/reducers';
import { resetPassword } from '../../services/api';

import './forgot-password.css';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const location = useLocation();
  const { isUserLoaded } = useSelector((store: AppState) => store.auth);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        resetPassword(email);
        history.push('/reset-password', { background: location });
      } catch (error) {
        console.error(error);
      }
    },
    [email, history, location]
  );

  if (isUserLoaded) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">Вход</p>
      <form onSubmit={handleResetPassword} className="align-forms">
        <Input
          type={'text'}
          placeholder={'Укажите email'}
          onChange={onEmailChange}
          value={email}
          name={'email'}
        />
        <div className="button">
          <Button type="primary">Восстановить</Button>
        </div>
      </form>
      <div className="links-container">
        <p className="text text_type_main-default text_color_inactive mt-20 mb-4">
          Вспомнили пароль?{' '}
          <Link to="/login" className="link-decoration">
            <span className="text text_type_main-default link-color__violet">
              Войти
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
