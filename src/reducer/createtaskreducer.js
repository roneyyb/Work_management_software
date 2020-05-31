import {
  CREATE_SUCCESS,
  CREATE_FAIL,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  SET_STATE,
  HANDLE_DATE_TIME_PICKER,
  SHOW_DATE_TIME_PICKER,
  CLEAR_ALL_CREATE_TASK,
  DELETE_SELECTED_TASK_FAIL,
  DELETE_SELECTED_TASK_SUCCESS,
  CLEAR_ALL_STATE,
  SET_NOTIFICATION,
  DEADLINE_CHANGE,
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  description: '',
  error: '',
  deadline: 'Add Task Deadline For Completion',
  reminder: 'Add Task Reminder For Completion',
  notificationid: 0,
  createsuccess: false,
  id: '',
  taskid_backend: '',
  update: false,
  updatesuccess: false,
  visible: false,
  deletesuccess: false,
  date: '',
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TITLE_CHANGE:
      return {...state, title: action.payload};
    case DESCRIPTION_CHANGE:
      return {...state, description: action.payload};
    case CREATE_FAIL:
      return {...state, error: action.payload};
    case CREATE_SUCCESS:
      return {...state, createsuccess: true};
    case CLEAR_ALL_CREATE_TASK:
      return {...INITIAL_STATE};
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationid: action.payload.notificationid,
        deadline: action.payload.deadline,
      };
    case SET_STATE:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        update: action.payload.update,
        id: action.payload.id,
        deadline: action.payload.deadline,
        notificationid: action.payload.notificationid,
        reminder: action.payload.reminder,
      };
    case DEADLINE_CHANGE:
      return {
        ...state,
        deadline: action.payload,
      };
    case DELETE_SELECTED_TASK_SUCCESS:
      return {...state, message: action.payload, deletesuccess: true};
    case CLEAR_ALL_STATE:
      return {...INITIAL_STATE};
    case DELETE_SELECTED_TASK_FAIL:
      return {...state, error: action.payload, deletesuccess: false};
    case TASK_UPDATE_FAIL:
      return {...state, error: action.payload};
    case TASK_UPDATE_SUCCESS:
      return {...state, updatesuccess: true};
    case HANDLE_DATE_TIME_PICKER:
      return {...state, date: action.payload, visible: false};
    case SHOW_DATE_TIME_PICKER:
      return {...state, visible: action.payload};
    default:
      return state;
  }
};
