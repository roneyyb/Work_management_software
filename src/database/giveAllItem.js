import SQLite from "react-native-sqlite-storage";
import {  UPDATE_WORK_LIST, LOADING_ALL_TASK} from '../actions/types';

const db = SQLite.openDatabase('multiutilityapp.db');

export const giveAllWork = () => {
    console.log('giveAllWork');
    return dispatch => {
        db.transaction(tx => {
            tx.executeSql(
                'Select * from USER_WORKS;',
                null,
                (td, results) => {
                    const rows = results.rows;
                    let works = [];

                    for (let i = 0; i <= rows.length; i++) {
                        if (i === rows.length) {
                            return dispatch({
                                type: UPDATE_WORK_LIST,
                                payload: works
                            });
                        } else {
                            works.push({
                                ...rows.item(i),
                            });
                        }
                    }
                },
                (_, error) => {
                    console.error("Error while selecting work from database.",error);
                }
            );
        }, (error) => {
            console.log('Error while selecting work from database.', error);
        }, () => { console.log('All work selected.'); });
    };
};

export const giveAllTask = (workid, filter1=0, filter2=0) => {
    return async (dispatch, getState) => {
        var completed = filter1;
        var sortBy = filter2
        console.log("giveAllTask",completed, sortBy);
        if (filter1 === 0 && filter2 === 0) {
            const { completed:c, sortBy:S } = getState().task.data;
            completed = c;
            sortBy = S;
        }
        console.log("giveAlltask", completed, sortBy);
        var task_completed = 0;
        if (completed) { task_completed = 1; }
        console.log("giveAllTask",task_completed);
        db.transaction(tx => {
            tx.executeSql(`Select * from WORK_TASKS where task_completed=? and workid=? ORDER BY task_createdAt ${sortBy === 'myOrder' ? 'ASC' : 'DESC'}`, [task_completed, workid], (_, results) => {
                const rows = results.rows;
                var tasks = [];
                for (let i = 0; i <= rows.length; i++) {
                    if (i === rows.length) {
                        dispatch({
                            type: LOADING_ALL_TASK,
                            payload: { message: tasks, completed, sortBy }
                        });
                        return;
                    } else {
                        tasks.push({
                            ...rows.item(i),
                        });
                    }
                }

            }, (_, error) => {
                console.log('Error while selecting task from databse', error);
            });
        }, (error) => { console.log('Error while selecting task from databse', error); }, () => { console.log('All task selected.'); });
    };
};

