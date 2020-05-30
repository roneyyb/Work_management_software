import {SET_UP_USER_ON_START, DEFAULT_WORK} from './types';

export const setupUserOnStart = val => {
  return (dispatch) => {
    dispatch({
    type: SET_UP_USER_ON_START,
    payload: {...val.user,work:val.work}
  });
  return dispatch({
    type:DEFAULT_WORK,
    payload:{work:val.work}
     })
  }
};
