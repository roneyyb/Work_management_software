import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_ALL_LOGIN,
  LOGIN_LOADING,
  DEFAULT_WORK
} from './types.js';

export const Clearall = () => ({
  type: CLEAR_ALL_LOGIN
});

export const onEmailChange = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const onPasswordChange = password => ({
  type: PASSWORD_CHANGED,
  payload: password
});

export const onButtonPress = ({ email, password }) => {
 
  const url = 'http://13.234.204.70:3000/login'; 
  return dispatch => {
    dispatch({ type: LOGIN_LOADING });
   fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          return dispatch({
            type: LOGIN_USER_FAIL,
            payload: 'Invalid credentials / unregistered user'
          });
        }
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res
        });
        return dispatch({
          type: DEFAULT_WORK,
          payload: { work: res.defaultwork }
        });
      })
    .catch((error) => {
      console.log('Error while fetching server +>',error);
      return dispatch({
        type: LOGIN_USER_FAIL,
        payload: 'Server Is Down!!'
      });
    });
  };
};
