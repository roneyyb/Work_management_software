import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase('multiutilityapp.db');

export const updateWorkInDatabase = (workid, work) => dispatch => {
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
                                'Data update successfuly inserted into WORK_UPDATE TABLE.',
                            );
                        },
                        error => {
                            console.error(
                                'Error while inserting data in cloud work update table.',
                                error,
                            );
                        },
                    );
                },
                (_, error) => {
                    console.error('SQlite error:Work update failed in Work table ', error);
                },
            );
        },
        (error) => {
            console.error('SQlite: work update failed',error);
        },
        () => {
            console.log('Work update success');
            
        },
    );
};

export const updateTaskInDatabase = (
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
    }
) => {
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
                        console.log('Task updated Successfully.');
                        tx.executeSql(
                            'Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)',
                            ['UPDATE', task.workid, task.taskid],
                            () => {
                                console.log(
                                    'Data update success in cloud task table.',
                                );
                            },
                            error => {
                                console.error(
                                    'SQlite: error while updating Task cloud table.',
                                    error,
                                );
                            },
                        );
                    },
                    (_, error) => {
                        console.error('SQLite: Task update table', error);
                    },
                );
            },
            error => {
                console.error('SQLite: Task update transaction error', error);
            },
            () => {
                console.log('Task update success');
            },
        );
};
