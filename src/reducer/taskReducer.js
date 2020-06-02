import {
	ADD_TASK,
	UPDATE_TASK,
	LOADING_ALL_TASK,
	REFRESHING,
	COMPLETE_SUCCESS,
	SEARCH_CHANGE,
	CLEAR_ALL_IN_TASKSHOW,
	SEARCH_TASK,
	SET_UPDATE_DATA_LIST,
	DELETE_WORK_LOADING,
	DELETE_WORK_SUCCESS,
	SET_DATA_TO_TOTALTASK,
	DELETE_TASKS,
	DELETE_TASK_FAIL,
	CLEAR_ALL_STATE
} from '../actions/types';

import produce from 'immer';
import { combineReducers } from 'redux';

const initialState = {
	byIds: {},
	data: {
		data: [],
		completed: false,
		sortBy: 'myOrder'
	},
	state: {
		loading: false,
		data: [],
		completed: false,
		sortBy: 'myOrder',
		error: '',
		refreshing: false,
		count: 0,
		undotype: '',
		search: '',
		updatetotaldatalist: false,
		searchvalue: ''
	}
};

const idReducer = produce((draft, action) => {
	switch (action.type) {
		case ADD_TASK:
			action.payload.forEach(item => {
				draft[item.taskid] = item;
			});
			break;
		case LOADING_ALL_TASK:
			draft = [];
			action.payload.message.forEach(item => {
				draft[item.taskid] = item;
			});
			break;
		case DELETE_TASKS:
			for (var i = 0; i < action.payload.deleteids.length(); i++) {
				delete draft[deleteids[i].taskid];
			}
			break;
		case UPDATE_TASK:
			draft[action.payload.taskid] = action.payload;
			break;
	}
}, initialState.byIds);

const dataReducer = produce((draft, action) => {
	switch (action.type) {
		case ADD_TASK:
			if (draft.sortBy == "myOrder") {
				draft.data.unshift(item.taskid);
			} else {
				draft.data.push(item.taskid);
			}
			break;
		case LOADING_ALL_TASK:
			draft.data = [];
			action.payload.forEach(item => {
				draft.data.push(item.taskid);
			});
			draft.sortBy = action.payload.sortBy;
			draft.completed = action.payload.completed;
			break;
		case DELETE_TASKS:
			const deleteids = action.payload.deleteids;
			for (var i = 0; i < deleteids.length(); i++) {
				const index = draft.data.indexOf(deleteids[i].taskid);
				draft.data.splice(index, 1);
			}
			break;
	}
}, initialState.state);

const stateReducer = produce(((draft, action) => {
	switch (action.type) {
		case LOADING_UP_DATA:
			return { ...state, loading: true };
		case LOADING_DATA_SUCCESS:
			draft.loading = false,
				draft.refreshing = false,
				draft.updatetotaldatalist = true;
			break;
		case COMPLETE_SUCCESS:
			draft.complete = true;
			break;
		case DELETE_WORK_LOADING:
			draft.loading = true;
			break;
		case DELETE_WORK_SUCCESS:
			draft.loading = false;
			draft.data = action.payload.tasklist;
			break;
		case DELETE_TASKS:
			draft.count = action.payload.count;
			draft.undotype = action.payload.undoType;
			draft.updatetotaldatalist = true;
			break;
		case DELETE_TASK_FAIL:
			draft.error = action.payload;
		case LOADING_DATA_FAIL:
			draft.error = action.payload;
			draft.loading = false;
			break;
		case REFRESHING:
			draft.refreshing = true;
			break;
		case SEARCH_TASK:
			draft.data = action.payload.data;
			draft.searchvalue = action.payload.searchvalue;
			break;
		case SEARCH_CHANGE:
			draft.search = action.payload;
			break;
		case CLEAR_ALL_STATE:
			return { ...INITIAL_STATE };
		case CLEAR_ALL_IN_TASKSHOW:
				draft.data= state.data,
				draft.sortBy= state.sortBy,
				draft.completed= state.completed
			    break;
		case SET_UPDATE_DATA_LIST:
			draft.updatetotaldatalist = false;
			break;
	}
}), initialState.state);

const taskReducer = combineReducers({
	byIds: idReducer,
	state: stateReducer,
	data: dataReducer
});

export default taskReducer;
// const allreducer =  (state = initialState, action) => {
// 	switch (action.type) {
// 		case LOADING_UP_DATA:
// 			return { ...state, loading: true };
// 		case LOADING_DATA_SUCCESS:
// 			return {
// 				...state,
// 				data: action.payload.message,
// 				completed: action.payload.completed,
// 				sortBy: action.payload.sortBy,
// 				loading: false,
// 				refreshing: false,
// 				updatetotaldatalist: true
// 			};
// 		case COMPLETE_SUCCESS:
// 			return { ...state, complete: true };
// 		case SET_DATA_TO_TOTALTASK:
// 			return { ...state, data: action.payload };
// 		case DELETE_WORK_LOADING:
// 			return { ...state, loading: true };
// 		case DELETE_WORK_SUCCESS:
// 			return { ...state, loading: false, data: action.payload.tasklist };
// 		case UNDO_DELETE_TASK_SUCCESS:
// 			return { ...state, data: action.payload.newdata, count: action.payload.count, undotype: action.payload.undoType, updatetotaldatalist: true };
// 		case UNDO_DELETE_TASK_FAIL:
// 			return { ...state, error: action.payload };
// 		case LOADING_DATA_FAIL:
// 			return { ...state, error: action.payload, loading: false };
// 		case REFRESHING:
// 			return { ...state, refreshing: true };
// 		case SEARCH_TASK:
// 			return { ...state, data: action.payload.data, searchvalue: action.payload.searchvalue };
// 		case SEARCH_CHANGE:
// 			return { ...state, search: action.payload };
// 		case CLEAR_ALL_STATE:
// 			return { ...INITIAL_STATE };
// 		case CLEAR_ALL_IN_TASKSHOW:
// 			return {
// 				...INITIAL_STATE,
// 				data: state.data,
// 				sortBy: state.sortBy,
// 				completed: state.completed
// 			};
// 		case SET_UPDATE_DATA_LIST:
// 			return { ...state, updatetotaldatalist: false };
// 		default:
// 			//console.log('action.type in task =>', action);
// 			return state;
// 	}
// };
