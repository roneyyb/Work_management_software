import {
	ADD_TASK,
	UPDATE_TASK,
	LOADING_ALL_TASK,
	REFRESHING,
	DELETE_TASKS
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
		count: 0,
		undoType: '',
		refreshing: false
	}
};

const idReducer = produce((draft, action) => {
	switch (action.type) {
		case ADD_TASK:
			const item = action.payload;
			draft[item.taskid] = item;
			break;
		case LOADING_ALL_TASK:
			var i,
				keys = Object.keys(draft);
			for (i = 0; i < keys.length; i++) {
				delete draft[keys[i]];
			}
			action.payload.message.forEach(item => {
				draft[item.taskid] = item;
			});
			break;
		case DELETE_TASKS:
			console.log("Delete tasks", action.payload);
			const deleteids = action.payload.deleteids;
			deleteids.forEach((item) => {
				delete draft[item.taskid];
			});
			break;
		case UPDATE_TASK:
			draft[action.payload.taskid] = action.payload;
			break;
	}
}, initialState.byIds);

const dataReducer = produce((draft, action) => {
	switch (action.type) {
		case ADD_TASK:
			const item = action.payload;
			if (draft.sortBy == "myOrder") {
				draft.data.push(item.taskid);
			} else {
				draft.data.unshift(item.taskid);
			}
			break;
		case LOADING_ALL_TASK:
			draft.data = [];
			action.payload.message.forEach(item => {
				draft.data.push(item.taskid);
			});
			draft.sortBy = action.payload.sortBy;
			draft.completed = action.payload.completed;
			break;
		case DELETE_TASKS:
			const deleteids = action.payload.deleteids;
			deleteids.forEach((item) => {
				const index = draft.data.indexOf(item.taskid);
				draft.data.splice(index, 1);
			});
			break;
	}
}, initialState.data);

const stateReducer = produce(((draft, action) => {
	switch (action.type) {
		case DELETE_TASKS:
			draft.undoType = action.payload.undoType;
			draft.count = action.payload.count;
			break;
		case REFRESHING:
			draft.refreshing = true;
			break;
		case LOADING_ALL_TASK:
			draft.refreshing = false;
			break;
	}
}), initialState.state);

const taskReducer = combineReducers({
	byIds: idReducer,
	state: stateReducer,
	data: dataReducer
});

export default taskReducer;
