import React, { useCallback, ChangeEvent } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { setNewPassword } from '../services/api';
import { AppState } from '../services/reducers';

import './forgot-password.css';
import { Location } from 'history';

interface State {
  from?: Location;
  background?: Location;
}

export const ResetPasswordPage = () => {
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const auth = useSelector((store: AppState) => store.auth);
  const history = useHistory();
  const location: Location<State> = useLocation();

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSetNewPassword = useCallback(async () => {
    try {
      await setNewPassword(password, token);
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  }, [history, password, token]);

  if (
    location.state?.background?.pathname !== '/forgot-password' ||
    auth.isUserLoaded
  ) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">Вход</p>
      <div className="align-forms mb-6">
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={onPasswordChange}
          value={password}
          name={'password'}
        />
      </div>
      <div className="align-forms mb-6">
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onTokenChange}
          value={token}
          name={'token'}
        />
      </div>
      <div className="button">
        <Button type="primary" onClick={handleSetNewPassword}>
          Сохранить
        </Button>
      </div>
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
