import SQLite from "react-native-sqlite-storage";
import {  UPDATE_WORK_LIST, LOADING_ALL_TASK} from '../actions/types';

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
        let completed = filter1;
        let sortBy = filter2
        if (filter1 == 0 && filter2 == 0) {
            const { completed:c, sortBy:S } = getState().task.data;
            completed = c;
            sortBy = S;
        }
        let task_completed = 0;
        if (completed) { task_completed = 1; }
        console.log('giveAlltask',completed,sortBy);
        db.transaction(tx => {
            tx.executeSql(`Select * from WORK_TASKS where task_completed=? and workid=? ORDER BY task_createdAt ${sortBy === 'myOrder' ? 'ASC' : 'DESC'}`, [task_completed, workid], (_, results) => {
                console.log('inside give_all_work action array=>', results.rows);
                const rows = results.rows;
                var tasks = [];
                console.log("all rows task",rows);
                for (let i = 0; i <= rows.length; i++) {
                    if (i === rows.length) {
                        console.log('dispatching action');
                        console.log(tasks);
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

