
import {
	ADD_TASK,
	UPDATE_TASK,
	REFRESHING,
	SEARCH_TASK,
	SET_UPDATE_DATA_LIST,
	SET_LOGIN_FALSE,
	SET_DATA_TO_TOTALTASK,
	DELETE_TASKS
} from './types';

export const addTaskInRedux = (data) => {
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

export const updateTaskInRedux = (task) => ({
	type: UPDATE_TASK,
	payload: task
});

export const settasklisttototaldata = (totaldata) => ({
	type: SET_DATA_TO_TOTALTASK,
	payload: totaldata
});


export const setUpdatelist = () => ({
	type: SET_UPDATE_DATA_LIST
});

export const Searchtask = (items, searchvalue) => ({
	type: SEARCH_TASK,
	payload: { data: items, searchvalue }
});

export const Refreshing = () => ({
	type: REFRESHING
});

