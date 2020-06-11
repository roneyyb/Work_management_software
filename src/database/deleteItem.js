import SQLite from "react-native-sqlite-storage";;

const db = SQLite.openDatabase('multiutilityapp.db');
export const deleteWorkInDatabase = (workid, workidbackend) => {
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
                    },
                    (_, error) => {
                        console.log('delete work failed error is =>', error);
                    }
                );
            },
            error => {
                console.log('Error of transaction deleteWork is =>', error);
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
                        console.log('Task data update delete request error', error);
                    });
                }, (_, error) => {
                    console.log("Error while deleting task", error);
            });
            });
        }, (error) => {
                console.log("Error while deleting task", error);
        }, () => {
                console.log("Error while deleting task", error);
        });
    };
};
