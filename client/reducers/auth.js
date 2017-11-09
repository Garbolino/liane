import {
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from "actions/auth";

const initialState = {
  signedIn: false,
  user: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        signing: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        signedIn: true,
        signing: false,
        user: {
          ...action.user
        }
      };
    }
    case AUTH_FAILURE: {
      // Keep auth data when server is unreachable
      if (
        action.err.message &&
        action.err.message.indexOf("timed out") !== -1
      ) {
        return state;
      }
      return {
        ...state,
        signedIn: false,
        signing: false,
        user: undefined
      };
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        signedIn: false,
        user: undefined
      };
    }
    default:
      return state;
  }
}
