import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  CLEAR_ALL_LOGIN,
  LOGIN_LOADING,
  CLEAR_ALL_STATE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  errors: '',
  defaultworkid: '',
  defaultwork:'',
  login: false,
  id: '',
  loginloading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_LOADING:
      return { ...state, loginloading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...INITIAL_STATE,
        login: true,
        loading: false,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        defaultworkid: action.payload.defaultworkid,
        defaultwork:action.payload.defaultwork
      };
    case CLEAR_ALL_LOGIN:
      return { ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, loginloading: false, errors: action.payload };
    case CLEAR_ALL_STATE:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
