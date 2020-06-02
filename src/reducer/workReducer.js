import {
    ADD_WORK,
    UPDATE_WORK,
    CHANGE_SELECTED_WORK,
    UPDATE_WORK_LIST,
    DELETE_WORK,
    SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
    SET_LOGIN_FALSE,
} from '../actions/types';

import produce from 'immer';
import { combineReducers } from 'redux';

const initialState = {
    //main worklist states
    byIds: {},
    state: {
        data: [],
        selectedwork: {}
    }
};
//         case SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION:
//             return { ...state, data: action.payload.data, selectedwork: action.payload.selectedwork };

const idReducer = produce((draft, action) => {
    switch (action.type) {
        case ADD_WORK:
            draft[action.payload.workid] = action.payload;
            break;
        case UPDATE_WORK:
            draft[action.payload.workid] = aciton.payload;
        case UPDATE_WORK_LIST:
            draft = {};
            action.payload.forEach((item) => {
                draft[item.workid] = item;
            })
            break;
        case DELETE_WORK:
            delete draft[action.payload.workid];
    }
}, initialState.byIds);

const stateReducer = produce((draft, action) => {
    switch (action.type) {
        case ADD_WORK:
            draft.data.push(item.workid);
            draft.selectedwork = item;
            break;
        case CHANGE_SELECTED_WORK:
            draft.selectedwork = action.payload;
            break;
        case UPDATE_WORK:
            draft.selectedwork = action.payload;
            break;
        case UPDATE_WORK_LIST:
            draft.data = [];
            action.payload.forEach((item) => {
                draft.push(item.workid);
            });
            break;
        case DELETE_WORK:
            const index = draft.data.indexOf(action.payload.workid);
            draft.data.splice(index,1);
            draft.selectedwork = action.payload.selectedwork;
            break;
    }
}, initialState.state);

const workReducer = combineReducers({
    byIds: idReducer,
    state: stateReducer
});

export default workReducer;


// export default (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case FETCH_SUCCESS_WORK_LIST:
//             return { ...state, data: action.payload };
//         case SET_STATE_WORK:
//             return { ...state, work: action.payload };
//         case FETCH_FAIL_WORK_LIST:
//             return { ...state, errorfetch: action.payload };
//         case CREATE_WORK_SUCCESS:
//             return {
//                 ...state,
//                 selectedwork: action.payload.selected,
//                 data: action.payload.data,
//                 created: true
//             };
//         case WORK_UPDATE_FAIL:
//             return { ...state, error: action.payload };
//         case WORK_UPDATE_SUCCESS:
//             return { ...state, workupdated: true, data: action.payload.worklist, selectedwork: action.payload.work };

//         case CREATE_WORK_FAIL:
//             return { ...state, error: action.payload };
//         case DEFAULT_WORK:
//             return { ...state, selectedwork: action.payload.work, updatetaskdata: true };
//         case SET_LOGIN_FALSE:
//             return { ...state, updatetaskdata: false };
//         case UPDATE_SUCCESS_WORK_LIST:
//             return {
//                 ...state,
//                 data: action.payload.datas,
//                 selectedwork: action.payload.Selectedwork,
//                 selected: true
//             };
//         case CLEAR_ALL_STATE:
//             return { ...INITIAL_STATE };
//         case UPDATE_FAIL_WORK_LIST:
//             return { ...state, errorupdate: action.payload };
//         case WORK_CHANGE:
//             return { ...state, work: action.payload };
//         case CREATE_WORK_CLEAR_ALL:
//             return {
//                 ...state,
//                 work: '',
//                 error: '',
//                 created: false,
//                 workupdated: false
//             };
//         case WORK_LIST_CLEAR_ALL:
//             return { ...state, selected: false, errorfetch: '' };
//         case SELECTED_WORK_UPDATE:
//             return { ...state, selectedwork: action.payload };
//         case SET_SELECTEDWORK_DATA:
//             return { ...state, selectedwork: action.payload.work, data: action.payload.worklist };
//         default:
//             return state;
//     }
// };
