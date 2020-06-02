import {
    ADD_WORK,
    UPDATE_WORK,
    CHANGE_SELECTED_WORK,
    SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
} from './types';

export const addWork = (work) => (
    {
        type: ADD_WORK,
        payload: work
    }
);

export const updatetheWork = (work) => (
    {
        type: UPDATE_WORK,
        payload: work
    }
);

export const changeSelectedWork = (work) => ({
    type: CHANGE_SELECTED_WORK,
    payload: work
});

export const setWorkList = () => ({
    
});

export const setworkdataaftercloudupdate = (data, workidbackendlist) => (
    (dispatch) => {
        var selectedwork = '';
        workidbackendlist.forEach(element => {
            data.every(work => {
                if (work.workid === element.workid) {
                    work.workid_backend = element.workid_backend;
                    if (work.work_selected === 1) {
                        selectedwork = work;
                    }
                    return false;
                }
                if (work.work_selected === 1) {
                    selectedwork = work;
                }
                return true;
            });
        });

        return dispatch({
            type: SET_WORKLIST_AFTER_CLOUD_DATA_UPDATION,
            payload: {
                data,
                selectedwork
            }
        });
    }
);

export const worklistclearall = () => ({
    type: WORK_LIST_CLEAR_ALL
});
