import { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../../components/modal/modal';

import './order-status.css';

interface State {
  from?: Location;
}

const ingredients = [
  'https://code.s3.yandex.net/react/code/meat-02.png',
  'https://code.s3.yandex.net/react/code/meat-04.png',
  'https://code.s3.yandex.net/react/code/meat-01.png',
  'https://code.s3.yandex.net/react/code/bun-02.png',
  'https://code.s3.yandex.net/react/code/meat-04.png',
  'https://code.s3.yandex.net/react/code/meat-01.png',
  'https://code.s3.yandex.net/react/code/bun-02.png',
];

export const OrderStatusPage = () => {
  const location: Location<State> = useLocation();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const from = location?.state?.from?.pathname;

  const OrderStatusInfo = () => {
    return (
      <div className="order-status-container">
        <p className="text text_type_digits-default order-number">#034533</p>
        <p className="text text_type_main-medium mt-6">
          Death Star Starship Main бургер
        </p>
        <p className="text text_type_main-default order-status mt-2">
          Выполнен
        </p>
        <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>
        <div className="order-rows-container">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="order-row mt-3">
              <div
                className="ingredients__item"
                key={index}
                style={{
                  background: `center / cover url(${ingredient}) no-repeat #000`,
                }}
              ></div>
              <p className="text text_type_main-default order-name ml-3">
                Филе Люминесцентного тетраодонтимформа
              </p>
              <div className="order-price mr-3">
                <p className="text text_type_digits-default mr-2">1 x 3000</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className="order-status-date mt-10">
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
          <div className="order-price">
            <p className="text text_type_digits-default mr-2">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {from === '/feed' || from === '/profile/orders' ? (
        <Modal onClose={handleClose}>
          <OrderStatusInfo />
        </Modal>
      ) : (
        <OrderStatusInfo />
      )}
    </div>
  );
};
