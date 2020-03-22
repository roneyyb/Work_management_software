import {
  LOADING_UP_DATA,
  LOADING_DATA_FAIL,
  LOADING_DATA_SUCCESS,
  REFRESHING,
  COMPLETE_SUCCESS,
  SEARCH_CHANGE,
  CLEAR_ALL_IN_TASKSHOW,
  SEARCH_TASK,
  SET_UPDATE_DATA_LIST,
  DELETE_WORK_LOADING,
  DELETE_WORK_SUCCESS,
  SET_DATA_TO_TOTALTASK,
  UNDO_DELETE_TASK_SUCCESS,
  UNDO_DELETE_TASK_FAIL,
  CLEAR_ALL_STATE
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: '',
  refreshing: false,
  count: 0,
  undotype: '',
  search: '',
  updatetotaldatalist: false,
  completed: false,
  sortBy: 'myOrder',
  searchvalue: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_UP_DATA:
      return { ...state, loading: true };
    case LOADING_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.message,
        completed: action.payload.completed,
        sortBy: action.payload.sortBy,
        loading: false,
        refreshing: false,
        updatetotaldatalist: true
      };
    case COMPLETE_SUCCESS:
      return { ...state, complete: true };
    case SET_DATA_TO_TOTALTASK:
      return { ...state, data: action.payload };
    case DELETE_WORK_LOADING:
      return { ...state, loading: true };
    case DELETE_WORK_SUCCESS:
      return { ...state, loading: false, data: action.payload.tasklist };
    case UNDO_DELETE_TASK_SUCCESS:
      return { ...state, data: action.payload.newdata, count: action.payload.count, undotype: action.payload.undoType, updatetotaldatalist: true };
    case UNDO_DELETE_TASK_FAIL:
      return { ...state, error: action.payload };
    case LOADING_DATA_FAIL:
      return { ...state, error: action.payload, loading: false };
    case REFRESHING:
      return { ...state, refreshing: true };
    case SEARCH_TASK:
      return { ...state, data: action.payload.data, searchvalue: action.payload.searchvalue };
    case SEARCH_CHANGE:
      return { ...state, search: action.payload };
    case CLEAR_ALL_STATE:
      return { ...INITIAL_STATE };
    case CLEAR_ALL_IN_TASKSHOW:
      return {
        ...INITIAL_STATE,
        data: state.data,
        sortBy: state.sortBy,
        completed: state.completed
      };
    case SET_UPDATE_DATA_LIST:
      return { ...state, updatetotaldatalist: false };
    default:
      //console.log('action.type in task =>', action);
      return state;
  }
};
