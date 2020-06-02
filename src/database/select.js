import SQLite from "react-native-sqlite-storage";
import { FETCH_SUCCESS_WORK_LIST, FETCH_FAIL_WORK_LIST, LOADING_DATA_FAIL, LOADING_UP_DATA, LOADING_DATA_SUCCESS } from '../actions/types';

const db = SQLite.openDatabase('multiutilityapp.db');

export const giveAllWork = () => {
    console.log('giveAllWork');
    return dispatch => {
        db.transaction(tx => {
            console.log('inside database')
            tx.executeSql(
                'Select * from USER_WORKS;',
                null,
                (td, results) => {
                    console.log('inside give_all_work action array=>', results.rows);
                    const rows = results.rows;
                    let users = [];

                    for (let i = 0; i <= rows.length; i++) {
                        if (i === rows.length) {
                            console.log('users =>', users);
                            return dispatch({
                                type: FETCH_SUCCESS_WORK_LIST,
                                payload: users
                            });
                        } else {
                            users.push({
                                ...rows.item(i),
                            });
                        }
                    }
                },
                (_, error) => {
                    return dispatch({
                        type: FETCH_FAIL_WORK_LIST,
                        payload: error
                    });
                }
            );
        }, (error) => {
            console.log('error give allwork', error);
        }, () => { console.log('transaction success'); });
    };
};

export const giveAllTask = (completed, workid, sortBy) => {
    let task_completed = 0;
    console.log('completed, workid, sortBy', completed, workid, sortBy);
    if (completed) { task_completed = 1; }
    else { task_completed = 0; }
    return dispatch => {
        dispatch({ type: LOADING_UP_DATA });
        db.transaction(tx => {
            tx.executeSql(`Select * from WORK_TASKS where task_completed=? and workid=? ORDER BY task_createdAt ${sortBy === 'myOrder' ? 'ASC' : 'DESC'}`, [task_completed, workid], (_, results) => {
                console.log('inside give_all_work action array=>', results.rows);
                const rows = results.rows;
                let users = [];

                for (let i = 0; i <= rows.length; i++) {
                    if (i === rows.length) {
                        console.log('users =>', users);

                        return dispatch({
                            type: LOADING_DATA_SUCCESS,
                            payload: { message: users, completed, sortBy }
                        });
                    } else {
                        users.push({
                            ...rows.item(i),
                        });
                    }
                }

            }, (_, error) => {
                console.log('error =>', error);
                return dispatch({
                    type: LOADING_DATA_FAIL,
                    payload: error
                });
            });
        }, (error) => { console.log('Give all task error select.js=>', error); }, () => { console.log('transaction successful'); });
    };
};

