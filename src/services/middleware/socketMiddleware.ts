import { RootStateOrAny } from "react-redux";
import { AnyAction } from "redux";
import { getCookie } from '../utils';

export const socketMiddleware = (wsUrl: string, wsActions: Record<string, string>) => {
    return (store: RootStateOrAny) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: AnyAction) => {
      const {
        dispatch,
      } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsClose,
      } = wsActions;
      const token = getCookie('accessToken')?.replace('Bearer ', '');

      if (type === wsInit) {
        socket = new WebSocket(
          `${wsUrl}${payload.isPrivate ? `?token=${token}` : '/all'}`
        );
      }

      if (type === wsClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
