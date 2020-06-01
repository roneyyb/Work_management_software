import SQLite from 'react-native-sqlite-storage';
import { WORK_UPDATE_FAIL, WORK_UPDATE_SUCCESS } from '../actions/types';
const db = SQLite.openDatabase('multiutilityapp.db');

export const updateWork = (workid, work, selectedwork, data) => dispatch => {
    db.transaction(
        tx => {
            tx.executeSql(
                'update USER_WORKS set work_title = ? where workid = ?',
                [work, workid],
                () => {
                    tx.executeSql(
                        'Insert into WORK_DATA_UPDATE(update_type, workid) values(?,?)',
                        ['UPDATE', workid],
                        () => {
                            console.log(
                                '----data update successfuly inserted into WORK_UPDATE TABLE-----',
                            );
                        },
                        error => {
                            console.log(
                                '-----user works data update post request error-----',
                                error,
                            );
                        },
                    );
                    data.forEach(item => {
                        if (item.workid === workid) {
                            item.work_title = work;
                        }
                    });
                    return dispatch({
                        type: WORK_UPDATE_SUCCESS,
                        payload: {
                            worklist: data,
                            work: { ...selectedwork, work_title: work },
                        },
                    });
                },
                (_, error) => {
                    console.log('error => ', error);
                    return dispatch({
                        type: WORK_UPDATE_FAIL,
                        paylaod: error,
                    });
                },
            );
        },
        () => {
            console.log('create work transaction success');
        },
        error => {
            console.log('work update error =>', error);
            return dispatch({
                type: WORK_UPDATE_FAIL,
                paylaod: error,
            });
        },
    );
};

export const updateTask = (
    {
        title,
        description,
        updatedAt,
        workid,
        deadline,
        reminder,
        notificationid,
        workid_backend,
        taskid,
    },
    callback = 0,
) => {
    return dispatch => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'update work_tasks set task_title=?, task_description=?, task_updatedAt=?, task_deadline=?, task_reminder=?, task_notificationid=? where taskid = ? and workid = ?',
                    [
                        title,
                        description,
                        updatedAt,
                        deadline,
                        reminder,
                        notificationid,
                        taskid,
                        workid,
                    ],
                    () => {
                        if (callback !== 0) {
                            callback(1);
                        }
                        console.log('Task updated Successfully.');
                        tx.executeSql(
                            'Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)',
                            ['UPDATE', task.workid, task.taskid],
                            () => {
                                console.log(
                                    '----data update method  task update -- updatequeries -- successfuly inserted into TASK_DATA_UPDATE TABLE-----',
                                );
                            },
                            error => {
                                console.log(
                                    '-----task data update -- update queries -- update request error-----',
                                    error,
                                );
                            },
                        );
                    },
                    (_, error) => {
                        console.log('task update error =>', error);
                    },
                );
            },
            error => {
                console.log('task update transaction error', error);
            },
            () => {
                console.log('task update success');
            },
        );
    };
};
