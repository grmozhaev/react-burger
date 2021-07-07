import ProfileSidebar from '../../components/profile-sidebar/profile-sidebar';
import { Order } from '../../components/feed-order/feed-order';

import '../profile/profile.css';
import './orders-history.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../services/reducers';
import { IOrder } from '../../services/actions/websocket';
import { getIngredients } from '../../services/actions/constructor';
import { useEffect } from 'react';
import {
  WS_CLEAR_ORDERS,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
} from '../../services/action-types/websocket';

export const OrderHistoryPage = () => {
  const { orders } = useSelector((state: AppState) => state.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { isPrivate: true } });
    dispatch(getIngredients());

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      dispatch({ type: WS_CLEAR_ORDERS });
    };
  }, [dispatch]);

  const { ingredients: allIngredients } = useSelector(
    (state: AppState) => state.root
  );

  return (
    <div className="profile-container">
      <ProfileSidebar />
      <div style={{ flex: 1, marginLeft: 100 }}>
        {orders?.map((order: IOrder, index) => (
          <Order
            key={index}
            ingredients={order.ingredients}
            status={order.status}
            number={order.number}
            _id={order._id}
            allIngredients={allIngredients}
            name={order.name}
            createdAt={order.createdAt}
            showStatus
          />
        ))}
      </div>
    </div>
  );
};
