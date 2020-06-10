import {
    ADD_WORK,
    UPDATE_WORK,
    CHANGE_SELECTED_WORK,
    DELETE_WORK,
    UPDATE_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
} from './types';

export const addWorkInRedux = (work) => ({
        type: ADD_WORK,
        payload: work
});

export const updateWorkInRedux = (work) => ({
        type: UPDATE_WORK,
        payload: work
});

export const changeSelectedWork = (work) => ({
    type: CHANGE_SELECTED_WORK,
    payload: work
});

export const deleteWorkInRedux = (workid, selectedwork) => ({
    type: DELETE_WORK,
    payload: {workid, selectedwork}
})

export const updateWorkListAfterCloud = (workidbackendlist) => ({
            type: UPDATE_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
            payload: workidbackendlist
});
