import React, { useCallback, ChangeEvent } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/api';

import './forgot-password.css';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = useCallback(async () => {
    try {
      await resetPassword(email);
      history.push('/reset-password');
    } catch (error) {
      console.error(error);
    }
  }, [email, history]);

  return (
    <div className="input-fields-container">
      <p className="text text_type_main-default mb-6 align-subtitle">Вход</p>
      <div className="align-forms mb-6">
        <Input
          type={'text'}
          placeholder={'Укажите email'}
          onChange={onEmailChange}
          value={email}
          name={'email'}
        />
      </div>
      <div className="button">
        <Button type="primary" onClick={handleResetPassword}>
          Восстановить
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
