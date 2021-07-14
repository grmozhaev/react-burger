import { combineReducers } from "redux";
import { constructorReducer } from './constructor/constructor';
import { authReducer } from './auth/auth';
import { wsReducer } from './websocket/websocket';

export const rootReducer = combineReducers({
    root: constructorReducer,
    auth: authReducer,
    ws: wsReducer,
})

export type AppState = ReturnType<typeof rootReducer>;