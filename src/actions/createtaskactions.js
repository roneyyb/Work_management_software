
import {
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  SET_STATE,
  HANDLE_DATE_TIME_PICKER,
  SHOW_DATE_TIME_PICKER,
  SET_NOTIFICATION,
  CLEAR_ALL_CREATE_TASK
} from './types';


export const dateTimePicker = visible => {
  return {
    type: SHOW_DATE_TIME_PICKER,
    payload: visible
  };
};



export const setnotification = (data) => {
      return {
        type: SET_NOTIFICATION,
        payload: data
      };
    }

    export const handleDateTimePicker = date => {
      return {
        type: HANDLE_DATE_TIME_PICKER,
        payload: date.getTime()
      };
    };
    export const onTitlechange = title => {
      return { type: TITLE_CHANGE, payload: title };
    };

    export const onDescriptionchange = description => {
      return { type: DESCRIPTION_CHANGE, payload: description };
    };

    export const onDeadlinechange = deadline => {
      return { type: DEADLINE_CHANGE, payload: deadline };
    }

    export const clearall = () => {
      return {
        type: CLEAR_ALL_CREATE_TASK
      };
    };

    export const setState = data => {
      return {
        type: SET_STATE,
        payload: data
      };
    };
