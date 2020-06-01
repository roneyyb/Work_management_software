import SQLite from "react-native-sqlite-storage";;

import {
  CREATE_WORK_SUCCESS,
  CREATE_WORK_FAIL,
  CREATE_FAIL
} from "../actions/types";

const db = SQLite.openDatabase("multiutilityapp.db");

export const createWork = (work, data) => {
  return dispatch => {
 
    db.transaction(
      tx => {
        const date = new Date();
        tx.executeSql(
          "Insert into USER_WORKS(work_title,workid, work_created, work_selected, work_deadline) values(?,?,datetime(), ?,?);",
          [work, uuid, 0, ""],
          (_, success) => {
            const newdata = [
              ...data,
              {
                work_title: work,
                workid: uuid,
                work_createdAt: new Date(),
                work_selected: 1,
                workid_backend: "",
                work_deadline:''
              }
            ];
            tx.executeSql(
              "Insert into WORK_DATA_UPDATE(update_type, workid) values(?,?)",
              ["POST", uuid],
              () => {
                },
              error => {
                console.log(
                  "-----user works data update post request error-----",
                  error
                );
              }
            );
            console.log("work array =>", newdata);
            newdata.forEach(item => {
              if (item.workid !== uuid) {
                item.work_selected = 0;
              }
            });
            return dispatch({
              type: CREATE_WORK_SUCCESS,
              payload: {
                data: newdata,
                selected: {
                  work_title: work,
                  workid: uuid,
                  work_selected: 1,
                  workid_backend: ""
                }
              }
            });
          },
          (_, error) => {
            console.log("New work not inserted problem occured => ", error);
            return dispatch({
              type: CREATE_WORK_FAIL,
              payload: error
            });
          }
        );
      },
      error => {
        console.log("create work success", error);
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const createTask = ({
  taskid,
  title,
  description,
  date,
  workid,
  deadline,
  reminder,
  notificationid,
  workid_backend
},callback) => {
  console.log("creating Task", title, date, workid, description);
  const uuid = uuidv1();
    return dispatch => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into WORK_TASKS(taskid, task_title, task_description, task_createdAt, workid, task_updatedAt, task_completedAt, task_deadline, task_reminder, task_notificationid, workid_backend,taskid_backend) values(?,?,?,datetime(),?, datetime(),?, ?,?,?,?,?)",
          [
            taskid,
            title,
            description,
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
            callback(1);
            tx.executeSql(
              "Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)",
              ["POST", workid, uuid],
              () => {
                console.log(
                  "----data update successfuly inserted into TASK_DATA_UPDATE TABLE-----"
                );
              },
              (_, error) => {
                console.log(
                  "-----task data update post request error-----",
                  error
                );
              }
            );
          },
          (_, error) => {
            return dispatch({
              type: CREATE_FAIL,
              payload: error
            });
          }
        );
      },
      error => {
        console.log("crea transaction erro l", error);
      },
      error => {
        console.log(error);
      }
    );
  };
};
