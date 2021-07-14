import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  WS_CLEAR_ORDERS,
  WS_CLEAR_ORDER
} from '../../action-types/websocket';

import { IOrder, WsAction, WsState } from "../../actions/websocket";
  
  const initialWebSocketState: WsState = {
    wsConnected: false,
    orders: [],
    order: null,
    total: 0,
    totalToday: 0,
    orderRequest: false,
    orderFailed: false,
  };
  
  export const wsReducer = (state = initialWebSocketState, action: WsAction) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_ORDERS:
        let ordersReversed: IOrder[] = [];
        if (action.payload.orders && action.payload.orders[0].number < action.payload.orders[1].number) {
          ordersReversed = action.payload.orders.reverse();
        }

        return {
          ...state,
          orders: ordersReversed.length ? ordersReversed : action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
  
      case GET_ORDERS_SUCCESS:
        return {
          ...state,
          order: action.payload.order,
        };

      case GET_ORDERS_REQUEST:
        return {
          ...state,
          orderRequest: true,
          orderFailed: false
        };

      case GET_ORDERS_FAILED:
        return {
          ...state,
          orderRequest: false,
          orderFailed: true
        };

      case WS_CLEAR_ORDERS:
        return {
          ...state,
          orders: []
        };

      case WS_CLEAR_ORDER:
        return {
          ...state,
          order: null
        };
  
      default:
        return state;
    }
  };
  