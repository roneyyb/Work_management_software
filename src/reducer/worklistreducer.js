import {
  WORK_CHANGE,
  CREATE_WORK_FAIL,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_CLEAR_ALL,
  UPDATE_FAIL_WORK_LIST,
  UPDATE_SUCCESS_WORK_LIST,
  FETCH_FAIL_WORK_LIST,
  FETCH_SUCCESS_WORK_LIST,
  WORK_LIST_CLEAR_ALL,
  DEFAULT_WORK,
  CLEAR_ALL_STATE,
  SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
  SET_LOGIN_FALSE,
  SET_STATE_WORK,
  SELECTED_WORK_UPDATE,
  WORK_UPDATE_SUCCESS,
  WORK_UPDATE_FAIL,
  SET_SELECTEDWORK_DATA
} from '../actions/types';

const INITIAL_STATE = {
  //main worklist states
  data: [],
  selected: false,
  errorfetch: '',
  errorupdate: '',
  
  
  work: '',
  error: '',
  created: false,
  workupdated: false,
  selectedwork: '',
  updatetaskdata: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_WORK_LIST:
      return { ...state, data: action.payload };
    case SET_STATE_WORK:
      return { ...state, work: action.payload };
    case FETCH_FAIL_WORK_LIST:
      return { ...state, errorfetch: action.payload };
    case CREATE_WORK_SUCCESS:
      return {
        ...state,
        selectedwork: action.payload.selected,
        data: action.payload.data,
        created: true
      };
    case WORK_UPDATE_FAIL:
      return { ...state, error: action.payload };
    case WORK_UPDATE_SUCCESS:
      return { ...state, workupdated: true, data: action.payload.worklist, selectedwork: action.payload.work };
    case SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION:
      return {...state, data: action.payload.data, selectedwork: action.payload.selectedwork};
    case CREATE_WORK_FAIL:
      return { ...state, error: action.payload };
    case DEFAULT_WORK:
      return { ...state, selectedwork: action.payload.work, updatetaskdata: true };
    case SET_LOGIN_FALSE:
      return { ...state, updatetaskdata: false };
    case UPDATE_SUCCESS_WORK_LIST:
      return {
        ...state,
        data: action.payload.datas,
        selectedwork: action.payload.Selectedwork,
        selected: true
      };
    case CLEAR_ALL_STATE:
      return { ...INITIAL_STATE };
    case UPDATE_FAIL_WORK_LIST:
      return { ...state, errorupdate: action.payload };
    case WORK_CHANGE:
      return { ...state, work: action.payload };
    case CREATE_WORK_CLEAR_ALL:
      return {
        ...state,
        work: '',
        error: '',
        created: false,
        workupdated: false
      };
    case WORK_LIST_CLEAR_ALL:
      return { ...state, selected: false, errorfetch: '' };
    case SELECTED_WORK_UPDATE:
      return { ...state, selectedwork: action.payload };
    case SET_SELECTEDWORK_DATA:
      return { ...state, selectedwork: action.payload.work, data: action.payload.worklist };
    default:
      return state;
  }
};
