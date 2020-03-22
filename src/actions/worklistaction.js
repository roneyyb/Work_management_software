import {
  WORK_CHANGE,
  CREATE_WORK_CLEAR_ALL,
  UPDATE_SUCCESS_WORK_LIST,
  SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
  UPDATE_FAIL_WORK_LIST,
  WORK_LIST_CLEAR_ALL,
  SET_STATE_WORK,
} from './types';

const url = 'http://13.234.204.70:3000'; 

export const setState = work => (
   {
    type: SET_STATE_WORK,
    payload: work
  });
export const clearallwork = () => (
  {
    type: CREATE_WORK_CLEAR_ALL
  });

export const setworkdataaftercloudupdate = (data,workidbackendlist) => (
  (dispatch) => {
    var selectedwork = '';
    workidbackendlist.forEach(element => {
      data.every(work => {
        if(work.workid === element.workid)
        {
          work.workid_backend = element.workid_backend;
          if(work.work_selected === 1)
          {
            selectedwork = work;
          }
          return false;
        }
        if(work.work_selected === 1)
          {
            selectedwork = work;
          }
        return true;
      });
    });

    return dispatch({
      type: SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
      payload: {data,
      selectedwork}
    });
  }
);

export const worklistclearall = () => ({
    type: WORK_LIST_CLEAR_ALL
  });

export const dataupdates = (data, workid) => (
  (dispatch) => {
    try {
    var work = '';
    data.forEach(element => {
     if(element.workid === workid)
     {
       element.work_selected = 1;
       work = element;
     }
     else {
     element.work_selected = 0;
     }
    });
        return dispatch({
          type: UPDATE_SUCCESS_WORK_LIST,
          payload: { datas: data, Selectedwork: work }
        });
      } catch (error) {
        return dispatch({
            type: UPDATE_FAIL_WORK_LIST,
            payload: error
          }); 
        }
  }
);

export const onChangework = work => (
  {
    type: WORK_CHANGE,
    payload: work
  });
