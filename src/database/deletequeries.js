import SQLite from "react-native-sqlite-storage";;

import {
    DELETE_SELECTED_TASK_FAIL,
    DELETE_SELECTED_TASK_SUCCESS
} from '../actions/types';

const db = SQLite.openDatabase('multiutilityapp.db');
export const deleteWork = (workid, workidbackend) => {
    console.log(
        'workid completed sortBy workidbackend =>',
        workid,
        completed,
        sortBy,
        defaultworkid,
        data,
        workidbackend
    );
    return () => {
        console.log('delete user work');
        db.transaction(
            tx => {
                tx.executeSql(
                    'delete from USER_WORKS where workid = ?;',
                    [workid],
                    () => {
                        tx.executeSql('delete from WORK_TASKS where workid=?', [workid], (_, { rows: { _array } }) => {//console.log('after work deletion tasks are',_array);
                        }, (_, error) => { console.log(error) });

                        tx.executeSql('Insert into WORK_DATA_UPDATE(update_type, workid) values(?,?)', ['DELETE', workidbackend], () => {
                            console.log('Cloud Data update successfull in deleteWork');
                        }, (_, error) => {
                            conole.log('User works data update post request error.', error);
                        });
                        // var indexd = 0;
                        // data.forEach((element, index) => {
                        //     if (element.workid === workid) {
                        //         indexd = index;
                        //     }
                        //     if (element.workid_backend === defaultworkid) {
                        //         work = element;
                        //         element.work_selected = 1;
                        //         return;
                        //     }
                        //     element.work_selected = 0;
                        // });
                        // data.splice(indexd, 1);
                        // tx.executeSql(
                        //     `select * from work_tasks where workid=? and task_completed = ? ORDER BY task_createdAt ${
                        //     sortBy === 'myOrder' ? 'ASC' : 'DESC'
                        //     }`,
                        //     [work.workid, completed === true ? 1 : 0],
                        //     (td, results) => {
                        //         console.log('inside give_all_work action array=>', results.rows);
                        //         const rows = results.rows;
                        //         let users = [];

                        //         for (let i = 0; i <= rows.length; i++) {
                        //             if (i === rows.length) {
                        //                 console.log('users =>', users, data);
                        //                 dispatch({
                        //                     type: SET_SELECTEDWORK_DATA,
                        //                     payload: { work, worklist: data }
                        //                 });
                        //                 return dispatch({
                        //                     type: DELETE_WORK_SUCCESS,
                        //                     payload: { tasklist: users }
                        //                 });
                        //             } else {
                        //                 users.push({
                        //                     ...rows.item(i),
                        //                 });
                        //             }
                        //         }

                        //     },
                        //     error => {
                        //         return dispatch({
                        //             type: DELETE_WORK_FAIL,
                        //             payload: error
                        //         });
                        //     }
                        // );
                    },
                    (_, error) => {
                        console.log('delete work failed error is =>', error);
                    }
                );
            },
            error => {
                console.error('Error of transaction deleteWork is =>', error);
            },
            () => {
                console.log('transaction successful');
            }
        );
    };
};

export const deleteTask = (taskids) => {
    return (dispatch) => {
        db.transaction(tx => {
            taskids.forEach(taskid => {
                tx.executeSql('delete from work_tasks where taskid=?', [taskid], () => {

                    tx.executeSql('Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)', ['DELETE', workid, taskid], () => {
                        console.log('Data update succesfully inserted');
                    }, (_, error) => {
                        console.error('Task data update delete request error', error);
                    });
                }, (_, error) => {
                    console.error("Error while deleting task", error);
            });
            });
        }, (error) => {
                console.error("Error while deleting task", error);
        }, () => {
                console.error("Error while deleting task", error);
        });
    };
};
