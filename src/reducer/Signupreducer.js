import {
  SIGNUP_CONFIRMPASSWORD,
  SIGNUP_EMAIL,
  SIGNUP_FAIL,
  SIGNUP_PASSWORD,
  SIGNUP_SUCCESS,
  SIGNUP_USERNAME_CHANGE,
  CLEAR_ALL_SIGNUP,
  SIGNUP_LOADING,
  CLEAR_ALL_STATE,
  ON_SIGNUP_DEFAULT_WORK
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  username: '',
  confirmpassword: '',
  error:false,
  error1: '',
  error2: '',
  error3: '',
  error4: '',
  error5: '',
  signup: false,
  signuploading: false,
  defaultwork: '',
  id: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_CONFIRMPASSWORD:
      return {
        ...state,
        confirmpassword: action.payload.confirmpassword,
        error4: action.payload.error4
      };
    case SIGNUP_LOADING:
      return { ...state, signuploading: true };
    case ON_SIGNUP_DEFAULT_WORK:
      return { ...state, defaultwork: action.payload };
    case SIGNUP_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        error2: action.payload.error2
      };
    case CLEAR_ALL_STATE:
      return { ...INITIAL_STATE };
    case SIGNUP_PASSWORD:
        return {
          ...state,
          password: action.payload.password,
          error3: action.payload.error3,
          error4:action.payload.error4
        };
    case SIGNUP_USERNAME_CHANGE:
      return {
        ...state,
        username: action.payload.username,
        error1: action.payload.error1
      };
    case SIGNUP_FAIL:
      return { ...state, signuploading: false, error5: action.payload.error5,error:true };
    case SIGNUP_SUCCESS:
      return {
        ...INITIAL_STATE,
        error:false,
        username: action.payload.user.username,
        signuploading: false,
        defaultwork: action.payload.work,       
        email: action.payload.user.email,
        id: action.payload.user._id,
        signup: true
      };
    case CLEAR_ALL_SIGNUP:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
