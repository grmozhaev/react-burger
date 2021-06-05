import React, { ChangeEvent } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { setNewPassword } from '../services/api';
import './forgot-password.css';

export const ResetPasswordPage = () => {
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const history = useHistory();

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSetNewPassword = async () => {
    try {
      await setNewPassword(password, token);
      history.push('/login');
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">Вход</p>
      <div className="align-forms mb-6">
        <Input
          type={'text'}
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
            <span className="text text_type_main-default link-color">
              Войти
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
