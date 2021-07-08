import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from 'history';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../../components/modal/modal';

import { getIngredients } from '../../services/actions/constructor';
import { AppState } from '../../services/reducers';
import { IngredientDTO } from '../../components/ingredient/ingredient';
import { getOrder } from '../../services/actions/websocket';
import { WS_CLEAR_ORDER } from '../../services/action-types/websocket';
import { orderStatus } from '../../components/feed-order/feed-order';
import { formatDate } from '../../services/utils';

import './order-status.css';

interface State {
  from?: Location;
}

export const OrderStatusPage = () => {
  const dispatch = useDispatch();
  const params = useParams<Record<string, string>>();
  const location: Location<State> = useLocation();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const from = location?.state?.from?.pathname;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getOrder(params.id));

    return () => {
      dispatch({ type: WS_CLEAR_ORDER });
    };
  }, [dispatch, params]);

  const { order } = useSelector((state: AppState) => state.ws);
  const { ingredients } = useSelector((state: AppState) => state.root);

  const orderInfo = useMemo(() => {
    return order?.ingredients.reduce(
      (acc: Record<string, IngredientDTO>, chunk: string) => {
        return { ...acc, [chunk]: ingredients?.[chunk] };
      },
      {}
    );
  }, [order, ingredients]);

  const counter = useMemo(() => {
    return order?.ingredients?.reduce(
      (acc: Record<string, number>, chunk: string) => {
        return acc[chunk]
          ? { ...acc, [chunk]: acc[chunk] + 1 }
          : { ...acc, [chunk]: 1 };
      },
      {}
    );
  }, [order]);

  const total = useMemo(() => {
    return (
      Object.keys(ingredients).length &&
      order?.ingredients.length &&
      order?.ingredients.reduce((total: number, ingredient: string) => {
        return ingredients?.[ingredient]?.type === 'bun'
          ? total + 2 * ingredients?.[ingredient]?.price
          : total + ingredients?.[ingredient]?.price;
      }, 0)
    );
  }, [order, ingredients]);

  if (!order || !total) {
    return <div>Loading...</div>;
  }

  const { status, number, name, createdAt } = order;

  const price = (ingredient: string) =>
    counter && orderInfo
      ? `${
          ingredients[ingredient]?.type === 'bun'
            ? 2 * counter[ingredient]
            : counter[ingredient]
        } x ${orderInfo[ingredient]?.price}`
      : '';

  const OrderStatusInfo = () => {
    return (
      <div className="order-status-container">
        <p className="text text_type_digits-default order-number">{`#${number}`}</p>
        <p className="text text_type_main-medium mt-6">{name}</p>
        <p className="text text_type_main-default order-status mt-2">
          {orderStatus[status]}
        </p>
        <p className="text text_type_main-medium mt-10 mb-6">Состав:</p>
        <div className="order-rows-container">
          {Object.keys(orderInfo || {}).map((ingredient, index) => (
            <div key={index} className="order-row mt-3">
              <div
                className="ingredients__item"
                key={index}
                style={{
                  background: `center / cover url(${orderInfo?.[ingredient]?.image}) no-repeat #000`,
                }}
              ></div>
              <p className="text text_type_main-default order-name ml-3">
                {orderInfo?.[ingredient]?.name}
              </p>
              <div className="order-price mr-3">
                <p className="text text_type_digits-default mr-2">
                  {price(ingredient)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className="order-status-date mt-10">
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(createdAt)}
          </p>
          <div className="order-price">
            <p className="text text_type_digits-default mr-2">{total}</p>
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
