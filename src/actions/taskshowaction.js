
import {
  REFRESHING,
  SEARCH_CHANGE,
  CLEAR_ALL_IN_TASKSHOW,
  SEARCH_TASK,
  SET_UPDATE_DATA_LIST,
  SET_LOGIN_FALSE,
  SET_DATA_TO_TOTALTASK,
  UNDO_DELETE_TASK_FAIL,
  UNDO_DELETE_TASK_SUCCESS
} from './types';


export const undoType = (data, deleteids, type) => (
   (dispatch) => {
    const newdata = [];
    try {
      data.forEach(element => {
      if (deleteids.findIndex(obj => obj.taskid===element.taskid) === -1) {
        newdata.push(element);
      }
    });
      return dispatch({
        type: UNDO_DELETE_TASK_SUCCESS,
        payload: { newdata, count: deleteids.length, undoType: type }
      });   
  } catch (error) {
    return dispatch({
      type: UNDO_DELETE_TASK_FAIL,
      payload: error
    });
  }
});


export const settasklisttototaldata = (totaldata) => ({
    type: SET_DATA_TO_TOTALTASK,
    payload: totaldata
  });

export const setloginfalse = () => ({
    type: SET_LOGIN_FALSE
  });


export const setUpdatelist = () => ({
    type: SET_UPDATE_DATA_LIST
  });

export const Searchtask = (items, searchvalue) => ({
    type: SEARCH_TASK,
    payload: { data: items, searchvalue }
  });

export const clearAll = () => ({
    type: CLEAR_ALL_IN_TASKSHOW
  });

export const Refreshing = () => ({
    type: REFRESHING
  });

export const onChangeTexts = text => ({
  type: SEARCH_CHANGE,
    payload: text
  });
