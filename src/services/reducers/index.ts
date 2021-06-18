import { combineReducers } from "redux";
import { ConstructorState } from "../actions/constructor";
import { AuthState } from "../actions/auth";
import { constructorReducer } from './constructor/constructor';
import { authReducer } from './auth/auth';

export const appReducer = combineReducers({
    root: constructorReducer,
    auth: authReducer,
})

export interface AppState{ root: ConstructorState, auth: AuthState };