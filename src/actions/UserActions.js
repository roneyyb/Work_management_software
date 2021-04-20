import {
  SET_UP_USER_ON_START,
  ADD_WORK,
  DESTROY_STATE,
  UPDATE_DEFAULT_WORK,
} from "./types";

export const setupUserOnStart = (val) => (dispatch) => {
  dispatch({
    type: SET_UP_USER_ON_START,
    payload: { ...val.user, work: val.work },
  });
  return dispatch({
    type: ADD_WORK,
    payload: val.work,
  });
};

export const updateDefaultWork = (work) => ({
  type: UPDATE_DEFAULT_WORK,
  payload: work,
});

export const resetRedux = () => ({
  type: DESTROY_STATE,
});
