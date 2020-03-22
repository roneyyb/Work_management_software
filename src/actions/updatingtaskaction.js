import { TASK_UPDATE_IN_PROCESS, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL } from './types';

export const updatingtask = task => {
  return {
    type: TASK_UPDATE_IN_PROCESS,
    payload: task
  };
};

export const onPressupdate = task => {
  const url = 'http://13.234.204.70:3000'; 
  return dispatch => {
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: task.userid
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          return dispatch({
            type: TASK_UPDATE_FAIL,
            payload: res.error
          });
        }
        return dispatch({
          type: TASK_UPDATE_SUCCESS,
          payload: res.message
        });
      });
  };
};
