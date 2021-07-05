import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Order } from '../../components/feed-order/feed-order';
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
} from '../../services/action-types/websocket';
import { getIngredients } from '../../services/actions/constructor';
import { IOrder } from '../../services/actions/websocket';
import { AppState } from '../../services/reducers';

import './feed.css';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (store: AppState) => store.ws
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { isPrivate: false } });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      dispatch({ type: WS_CLEAR_ORDERS });
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients: allIngredients } = useSelector(
    (state: AppState) => state.constructor
  );

  const filterOrders = useCallback((orders: IOrder[]) => {
    let ordersDone: number[] = [];
    let ordersInProgress: number[] = [];

    orders.map((order) => {
      return order.status === 'done'
        ? ordersDone.push(order.number)
        : ordersInProgress.push(order.number);
    });

    return [ordersDone, ordersInProgress];
  }, []);

  const [ordersDone, ordersInProgress] = filterOrders(orders);

  return (
    <div>
      <p className="text text_type_main-large mb-3 mt-3">Лента заказов</p>
      <div className="feed-container mt-6">
        <div style={{ maxWidth: 600, flex: 1 }}>
          {orders.map((order: IOrder, index) => (
            <Order
              key={index}
              ingredients={order.ingredients}
              status={order.status}
              number={order.number}
              _id={order._id}
              allIngredients={allIngredients}
              name={order.name}
              createdAt={order.createdAt}
              showStatus={false}
            />
          ))}
        </div>
        <div className="ml-20 orders-readiness-display">
          <div className="order-numbers-container">
            <div className="done-orders">
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <div className="orders-style">
                {ordersDone.map((order, index) => (
                  <div className="orders-style__align" key={index}>
                    <p className="text text_type_digits-default done-orders-color">
                      {order}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-6">
              <p className="text text_type_main-medium mb-6">В работе:</p>

              <div className="orders-style">
                {ordersInProgress.map((order, index) => (
                  <div className="orders-style__align">
                    <p
                      key={`${index}-${order}`}
                      className="text text_type_digits-default"
                    >
                      {order}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium mt-6">
              Выполнено за все время:
            </p>
            <span className="text text_type_digits-large">{total}</span>
          </div>
          <div>
            <p className="text text_type_main-medium mt-6">
              Выполнено за сегодня:
            </p>
            <span className="text text_type_digits-large">{totalToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
