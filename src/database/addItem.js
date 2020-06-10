import SQLite from "react-native-sqlite-storage";;
const db = SQLite.openDatabase("multiutilityapp.db");

export const addWorkInDatabase = (work) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    "Insert into USER_WORKS(work_title,workid, work_created, work_selected, work_deadline) values(?,?,datetime(), ?,?);",
                    [work.work_title, work.workid, 0, ""],
                    (_, success) => {
                        console.log("Work created successfully.");
                        tx.executeSql(
                            "Insert into WORK_DATA_UPDATE(update_type, workid) values(?,?)",
                            ["POST", work.workid],
                            () => {
                            },
                            (_, error) => {
                                console.error(
                                    "User work data not inserted in cloud data update table",
                                    error
                                );
                            }
                        );
                    },
                    (_, error) => {
                        console.log("New work not inserted problem occured => ", error);
                    }
                );
            },
            error => {
                console.error("Create work transaction error", error);
            },
            () => {
                console.log('Create work Success');
            }
        );
};

export const addTaskInDatabase = ({
    taskid,
    title,
    description,
    date,
    workid,
    deadline,
    reminder,
    notificationid,
    workid_backend
}, callback) => {
    console.log("creating Task", title, date, workid, description);
        db.transaction(
            tx => {
                tx.executeSql(
                    "insert into WORK_TASKS(taskid, task_title, task_description, task_createdAt, workid, task_updatedAt, task_completedAt, task_deadline, task_reminder, task_notificationid, workid_backend,taskid_backend) values(?,?,?,?,?, datetime(),?, ?,?,?,?,?)",
                    [
                        taskid,
                        title,
                        description,
                        date,
                        workid,
                        "",
                        deadline,
                        reminder,
                        notificationid,
                        workid_backend,
                        ""
                    ],
                    () => {
                        console.log("Task created successfully");
                        tx.executeSql(
                            "Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)",
                            ["POST", workid, taskid],
                            () => {
                                console.log(
                                    "Data update successfuly inserted into TASK_DATA_UPDATE TABLE."
                                );
                            },
                            (_, error) => {
                                console.log(
                                    "Task cloud update table error.",
                                    error
                                );
                            }
                        );
                        callback(1);
                    },
                    (_, error) => {
                        console.error("Insertion error in task table.",error);
                    }
                );
            },
            error => {
                console.error("Create task transaction error", error);
            },
            error => {
                console.log("Task added to database.");
            }
        );
};
