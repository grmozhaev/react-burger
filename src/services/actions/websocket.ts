import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IngredientStoreObject } from "../../components/ingredient/ingredient";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  WS_CONNECTION_START,
  WS_CLEAR_ORDERS,
  WS_CLEAR_ORDER
} from '../action-types/websocket';

import { fetchOrder } from "../api";

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  allIngredients: IngredientStoreObject;
  name: string;
  createdAt: string;
  showStatus?: boolean;
}

export interface WsState {
  wsConnected: boolean;
  orders: IOrder[];
  order: IOrder | null;
  total: number;
  totalToday: number;
  orderRequest: boolean;
  orderFailed: boolean;
}

export type WsAction =
| { type: typeof WS_CONNECTION_START, payload: {isPrivate: boolean}}
| { type: typeof WS_CONNECTION_SUCCESS}
| { type: typeof WS_CONNECTION_ERROR }
| { type: typeof WS_GET_ORDERS, payload: { orders: IOrder[], total: number, totalToday: number } }
| { type: typeof WS_CONNECTION_CLOSED }
| { type: typeof GET_ORDERS_REQUEST }
| { type: typeof GET_ORDERS_SUCCESS, payload: { order: IOrder } }
| { type: typeof GET_ORDERS_FAILED }
| { type: typeof WS_CLEAR_ORDERS }
| { type: typeof WS_CLEAR_ORDER }

export const getOrder =
  (orderId: string) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: GET_ORDERS_REQUEST });

    try {
      const orders = await fetchOrder(orderId);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: {order: orders[0]} });
    } catch (e) {
      dispatch({ type: GET_ORDERS_FAILED });
    }
  };