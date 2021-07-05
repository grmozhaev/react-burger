import { combineReducers } from "redux";
import { ConstructorState } from "../actions/constructor";
import { AuthState } from "../actions/auth";
import { constructorReducer } from './constructor/constructor';
import { authReducer } from './auth/auth';
import { wsReducer } from './websocket/websocket';
import { WsState } from "../actions/websocket";

export const rootReducer = combineReducers({
    constructor: constructorReducer,
    auth: authReducer,
    ws: wsReducer,
})

export interface AppState{ constructor: ConstructorState, auth: AuthState, ws: WsState };