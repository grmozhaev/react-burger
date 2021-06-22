import { AuthActionType as types } from "../../actions/auth";
import { authReducer, initialAuthState as initialState } from "./auth";

describe("Auth reducer", () => {
  it("should return the initial auth state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_SIGNUP_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNUP_REQUEST,
      })
    ).toEqual({
      ...initialState,
      signupRequest: true,
      signupFailed: false,
    });
  });

  it("should handle GET_SIGNUP_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNUP_SUCCESS,
        data: {
          name: "123",
          email: "123@456.ru",
        },
      })
    ).toEqual({
      ...initialState,
      name: "123",
      email: "123@456.ru",
    });
  });

  it("should handle GET_SIGNUP_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNUP_FAILED,
      })
    ).toEqual({
      ...initialState,
      signupFailed: true,
      signupRequest: false,
    });
  });

  it("should handle GET_SIGNIN_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      signinRequest: true,
      signinFailed: false,
    });
  });

  it("should handle GET_SIGNIN_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNIN_SUCCESS,
        data: {
          email: "123@456.ru",
        },
      })
    ).toEqual({
      ...initialState,
      email: "123@456.ru",
      isUserLoaded: true,
      signinFailed: false,
      signinRequest: false,
    });
  });

  it("should handle GET_SIGNIN_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      signinFailed: true,
      signinRequest: false,
    });
  });

  it("should handle GET_SIGNOUT_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      signoutRequest: true,
      signoutFailed: false,
    });
  });

  it("should handle GET_SIGNOUT_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNOUT_SUCCESS,
      })
    ).toEqual(initialState);
  });

  it("should handle GET_SIGNOUT_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: types.GET_SIGNOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
      signoutFailed: true,
      signoutRequest: false,
    });
  });

  it("should handle EDIT_USER_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: types.EDIT_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      editUserRequest: true,
      editUserFailed: false,
    });
  });

  it("should handle EDIT_USER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: types.EDIT_USER_SUCCESS,
        data: {
          name: "123",
          email: "123@456.ru",
        },
      })
    ).toEqual({
      ...initialState,
      name: "123",
      email: "123@456.ru",
    });
  });

  it("should handle EDIT_USER_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: types.EDIT_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      editUserFailed: true,
      editUserRequest: false,
    });
  });
});
