import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { createUser, editUser, login, logout } from "../api";
import { History } from "history";

export interface AuthState {
  email: string;
  name: string;
  isUserLoaded: boolean;
  signupRequest: boolean;
  signupFailed: boolean;
  signinRequest: boolean;
  signinFailed: boolean;
  signoutRequest: boolean;
  signoutFailed: boolean;
  editUserRequest: boolean;
  editUserFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenSuccess: boolean;
  refreshTokenFailed: boolean;
}

export type AuthAction =
| { type: AuthActionType.GET_SIGNUP_REQUEST }
| { type: AuthActionType.GET_SIGNUP_SUCCESS; data: { name: string; email: string }}
| { type: AuthActionType.GET_SIGNUP_FAILED }
| { type: AuthActionType.GET_SIGNOUT_REQUEST }
| { type: AuthActionType.GET_SIGNOUT_SUCCESS }
| { type: AuthActionType.GET_SIGNOUT_FAILED }
| { type: AuthActionType.GET_SIGNIN_REQUEST }
| { type: AuthActionType.GET_SIGNIN_SUCCESS; data: { email: string }}
| { type: AuthActionType.GET_SIGNIN_FAILED }
| { type: AuthActionType.EDIT_USER_REQUEST }
| { type: AuthActionType.EDIT_USER_SUCCESS; data: { name: string; email: string } }
| { type: AuthActionType.EDIT_USER_FAILED }

export enum AuthActionType {
  GET_SIGNUP_REQUEST = "GET_SIGNUP_REQUEST",
  GET_SIGNUP_SUCCESS = "GET_SIGNUP_SUCCESS",
  GET_SIGNUP_FAILED = "GET_SIGNUP_FAILED",
  GET_SIGNOUT_REQUEST = "GET_SIGNOUT_REQUEST",
  GET_SIGNOUT_SUCCESS = "GET_SIGNOUT_SUCCESS",
  GET_SIGNOUT_FAILED = "GET_SIGNOUT_FAILED",
  GET_SIGNIN_REQUEST = "GET_SIGNIN_REQUEST",
  GET_SIGNIN_SUCCESS = "GET_SIGNIN_SUCCESS",
  GET_SIGNIN_FAILED = "GET_SIGNIN_FAILED",
  EDIT_USER_REQUEST = "EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED = "EDIT_USER_FAILED",
}

export const editUserInfo =
  (name: string, email: string, password: string) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "EDIT_USER_REQUEST" });

    try {
      const data = await editUser(name, email, password);
      dispatch({ type: "EDIT_USER_SUCCESS", data });
    } catch (error) {
      dispatch({ type: "EDIT_USER_FAILED" });
    }
  };

export const signup =
  (name: string, email: string, password: string, history: History) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "GET_SIGNUP_REQUEST" });

    try {
      const data = await createUser(name, email, password);
      dispatch({ type: "GET_SIGNUP_SUCCESS", data });
      history.push('/login');
    } catch (error) {
      dispatch({ type: "GET_SIGNUP_FAILED" });
    }
  };

export const signin =
  (email: string, password: string) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "GET_SIGNIN_REQUEST" });

    try {
      const data = await login(email, password);
      dispatch({ type: "GET_SIGNIN_SUCCESS", data });
    } catch (error) {
      dispatch({ type: "GET_SIGNIN_FAILED" });
    }
  };

export const signout = () =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "GET_SIGNOUT_REQUEST" });

    try {
      await logout();
      dispatch({ type: "GET_SIGNOUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "GET_SIGNOUT_FAILED" });
    }
  };
