import { createReducer } from '../../app/common/util/reducerUtils.js';
import { SIGN_OUT_USER, LOGIN_USER } from './authConstants.js';

const initialState = {
  authenticated: false,
  currentUser: null
};

const loginUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.creds.email
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOutUser
});