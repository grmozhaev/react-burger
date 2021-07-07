import { combineReducers } from "redux";
import { ConstructorState } from "../actions/constructor";
import { AuthState } from "../actions/auth";
import { constructorReducer } from './constructor/constructor';
import { authReducer } from './auth/auth';
import { wsReducer } from './websocket/websocket';
import { WsState } from "../actions/websocket";

export const rootReducer = combineReducers({
    root: constructorReducer,
    auth: authReducer,
    ws: wsReducer,
})

export interface AppState{ root: ConstructorState, auth: AuthState, ws: WsState };