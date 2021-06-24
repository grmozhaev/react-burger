import { AuthAction, AuthActionType as types, AuthState } from "../../actions/auth";

export const initialAuthState: AuthState = {
  email: '',
  name: '',
  isUserLoaded: !!localStorage.getItem('refreshToken'),
  signupRequest: false,
  signupFailed: false,
  signinRequest: false,
  signinFailed: false,
  signoutRequest: false,
  signoutFailed: false,
  editUserRequest: false,
  editUserFailed: false,
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: false,
};

export const authReducer = (state = initialAuthState, action: AuthAction) => {
  switch (action.type) {
    case types.GET_SIGNUP_REQUEST: {
      return {
        ...state,
        signupRequest: true,
        signupFailed: false,
      }
    }

    case types.GET_SIGNUP_SUCCESS: {
      return {
        ...state,
        email: action.data.email,
        name: action.data.name,
        signupFailed: false,
        signupRequest: false,
      }
    }

    case types.GET_SIGNUP_FAILED: {
      return {
        ...state,
        signupFailed: true,
        signupRequest: false,
      }
    }

    case types.GET_SIGNIN_REQUEST: {
      return {
        ...state,
        signinRequest: true,
        signinFailed: false,
      }
    }
    
    case types.GET_SIGNIN_SUCCESS: {
      return {
        ...state,
        email: action.data.email,
        isUserLoaded: true,
        signinFailed: false,
        signinRequest: false,
      }
    }

    case types.GET_SIGNIN_FAILED: {
      return {
        ...state,
        signinFailed: true,
        signinRequest: false,
      }
    }

    case types.GET_SIGNOUT_REQUEST: {
      return {
        ...state,
        signoutRequest: true,
        signoutFailed: false,
      }
    }
    
    case types.GET_SIGNOUT_SUCCESS: {
      return {
        ...state,
        isUserLoaded: false,
        signoutFailed: false,
        signoutRequest: false,
      }
    }

    case types.GET_SIGNOUT_FAILED: {
      return {
        ...state,
        signoutFailed: true,
        signoutRequest: false,
      }
    }

    case types.EDIT_USER_REQUEST: {
      return {
        ...state,
        editUserRequest: true,
        editUserFailed: false,
      }
    }
    
    case types.EDIT_USER_SUCCESS: {
      return {
        ...state,
        email: action.data.email,
        name: action.data.name,
        editUserRequest: false,
        editUserFailed: false,
      }
    }

    case types.EDIT_USER_FAILED: {
      return {
        ...state,
        editUserFailed: true,
        editUserRequest: false,
      }
    }

    default:
      return state;
  }
};
