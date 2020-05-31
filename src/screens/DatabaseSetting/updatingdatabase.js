import axios from 'axios';
import SQLite from "react-native-sqlite-storage";;
import url from '../../constants/Server';
const db = SQLite.openDatabase('multiutilityapp.db');


function Updatetaskindatabase(userid, callback) {
  axios({
    url: `${url}/alltaskget`,
    method: 'GET',
    headers: {
      Authorization: userid
    }
  }).then(response => {
    if(!response.data.error) {
    db.transaction(tx => {

      response.data.tasklist
        .forEach(task => {
          tx.executeSql(
            'insert into WORK_TASKS(taskid, task_title, task_description, task_createdAt, workid, task_updatedAt, task_completed,task_completedAt, task_deadline, task_reminder, task_notificationid, workid_backend,taskid_backend) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
              task.taskid,
              task.task_title,
              task.task_description,
              task.task_createdAt,
              task.workid,
              task.task_updatedAt,
              task.task_completed,
              task.task_completedAt,
              task.task_deadline,
              task.task_reminder,
              task.task_notificationid,
              task.workid_backend,
              task._id
            ],
            () => {
            },
            (_, error) => {
            }
          );
        })
    },(error) => {},() => {
        callback();
    });
} else 
    {
      
}
  })
  .catch(error => {
  
  });
}

export default function Updatingdatabase(userid, callback) {
  axios({
    url: `${url}/worklistget`,
    method: 'GET',
    headers: {
      Authorization: userid
    }
  })
    .then(response => {
      if (!response.data.error) {
        db.transaction(
          tx => {
            response.data.worklist.forEach(work => {
              tx.executeSql(
                'Insert into USER_WORKS(workid,workid_backend,work_selected,work_created,work_deadline,work_title) values(?,?,?,?,?,?)',
                [
                  work.workid,
                  work._id,
                  work.work_selected,
                  work.work_created,
                  work.work_deadline,
                  work.work_title
                ],
                () => {
                },
                (_, error) => {
                }
              );
            });
          },
          error => {
          },
          () => {
            Updatetaskindatabase(userid, callback);
          }
        );
      } else {
       
      }
    })
    .catch(error => {
    });
}
