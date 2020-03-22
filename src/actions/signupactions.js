import {
  SIGNUP_EMAIL,
  SIGNUP_FAIL,
  SIGNUP_CONFIRMPASSWORD,
  SIGNUP_PASSWORD,
  SIGNUP_SUCCESS,
  SIGNUP_USERNAME_CHANGE,
  CLEAR_ALL_SIGNUP,
  SIGNUP_LOADING,
  DEFAULT_WORK
} from './types';
import uuidv1 from 'uuid/v1';

export const onChangeusername = username => {
  return dispatch => {
    if (username.length < 7) {
      return dispatch({
        type: SIGNUP_USERNAME_CHANGE,
        payload: {
          username,
          error1: 'min length of user name should be 7'
        }
      });
    }
    return dispatch({
      type: SIGNUP_USERNAME_CHANGE,
      payload: {
        username,
        error1: ''
      }
    });
  };
};

export const Clearall = () => {
  return {
    type: CLEAR_ALL_SIGNUP
  };
};

export const onChangeemail = email => {
  return dispatch => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return dispatch({
        type: SIGNUP_EMAIL,
        payload: { email, error2: '' }
      });
    }
    return dispatch({
      type: SIGNUP_EMAIL,
      payload: {
        email,
        error2:
          'Valid E-mail type is example@domain'
      }
    });
  };
};
export const onChangepassword = (password,confirmpassword,error4) => {
  return dispatch => {
    if (!/^[A-Za-z]\w{6,14}$/.test(password)) {
      if(confirmpassword.length!=0 && confirmpassword!==password)
      {return dispatch({
        type: SIGNUP_PASSWORD,
        payload: {
          password,
          error3:
            'Should start with A-Za-z min. length should be 7 max 14 should contain one numerical',
            error4:'Password does not match'
        }
      });} else {
        return dispatch({
          type: SIGNUP_PASSWORD,
          payload: {
            password,
            error3:
              'Should start with A-Za-z min. length should be 7 max 14 should contain one numerical',
             error4
          }
        });
      }
    } else {
    if(confirmpassword.length!==0 && confirmpassword!==password)
{    return dispatch({
      type: SIGNUP_PASSWORD,
      payload: {
        password,
        error3: '',
        error4:'Password does not match'
      }
    });

  }
 else {
  return dispatch({
    type: SIGNUP_PASSWORD,
    payload: {
      password,
      error3: '',
      error4:''
//      error4:'Password does not match'
    }
  });
}
    }
  };
};


export const onChangeconfirmpassword = ({
  password,
  confirmpassword,
  error3
}) => {
  return dispatch => {
    if (error3.length === 0 && password === confirmpassword) {
      return dispatch({
        type: SIGNUP_CONFIRMPASSWORD,
        payload: { confirmpassword, error4: '' }
      });
    }
    return dispatch({
      type: SIGNUP_CONFIRMPASSWORD,
      payload: { confirmpassword, error4: 'Password do not match' }
    });
  };
};
export const onSignup = ({
  username,
  password,
  email,
  confirmpassword,
  error1,
  error2,
  error3,
  error4
}) => {
  
  const url = 'http://13.234.204.70:3000/signup'; 
  const uuid = uuidv1();
  return dispatch => {
    dispatch({ type: SIGNUP_LOADING });
    if (
      error1.length === 0 &&
      error2.length === 0 &&
      error3.length === 0 &&
      error4.length === 0 &&
      username.length !== 0 &&
      password.length !== 0 &&
      email.length !== 0
    ) {
      if (confirmpassword.length === 0) {
        return dispatch({
          type: SIGNUP_CONFIRMPASSWORD,
          payload: { confirmpassword, error4: 'enter password again' }
        });
      }
      if (confirmpassword !== password) {
        return dispatch({
          type: SIGNUP_CONFIRMPASSWORD,
          payload: { confirmpassword, error4: 'password do not match' }
        });
      }
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'defaultworkid': uuid,
          'date': ''
        },
        body: JSON.stringify({
          email,
          password,
          username
        })
      })
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            return dispatch({
              type: SIGNUP_FAIL,
              payload: { error5: res.error }
            });
          }
          
          return dispatch({
            type: SIGNUP_SUCCESS,
            payload: res
          });
        })
        .catch(error => {
          return dispatch({
            type: SIGNUP_FAIL,
            payload: { error5: 'Server Is Down!!' }
          });
        });
    } else {
      return dispatch({
        type: SIGNUP_FAIL,
        payload: { error5: 'Check your credentials' }
      });
    }
  };
};
