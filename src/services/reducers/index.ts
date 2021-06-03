import { combineReducers } from "redux";
import { ConstructorState } from "../actions/constructor";
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
    root: constructorReducer,
})

export interface RootState{ root: ConstructorState };