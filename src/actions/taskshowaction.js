
import {
	ADD_TASK,
	REFRESHING,
	SEARCH_CHANGE,
	CLEAR_ALL_IN_TASKSHOW,
	SEARCH_TASK,
	SET_UPDATE_DATA_LIST,
	SET_LOGIN_FALSE,
	SET_DATA_TO_TOTALTASK,
	DELETE_TASKS
} from './types';

export const addTask = (data) => {
	(dispatch) => {
		return dispatch({
			type: ADD_TASK,
			payload: data
		});
	}
}

export const undoType = (deleteids, type) => (
	(dispatch) => {
		return dispatch({
			type: DELETE_TASKS,
			payload: { deleteids, count: deleteids.length, undoType: type }
		});
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
