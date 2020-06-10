import axios from 'axios';
import SQLite from "react-native-sqlite-storage";;
import url from '../../constants/Server';
const db = SQLite.openDatabase('multiutilityapp.db');


export function actionAfterNotUndoOnDatabase(deleteids, undotype, workid) {
  const todaydate = new Date();
  if (undotype === 'complete' || undotype === 'incomplete') {
    db.transaction(
      tx => {
        if (undotype === 'complete') {
          var completed = 1;
        } else var completed = 0;

        deleteids.forEach(taskid => {
          tx.executeSql(
            'update work_tasks set task_completed=?, task_completedAt=? where taskid=?',
            [completed, todaydate.toString(), taskid.taskid],
            () => {
              tx.executeSql(
                'Insert into TASK_DATA_UPDATE(update_type, workid, taskid) values(?,?,?)',
                ['UPDATE', workid.workid, taskid.taskid],
                () => { console.log('Data update after undo successfull.'); },
                (_, error) => { console.error('Problem in deleting ids from database', error); }
               
              );
            },
            () => { console.log('Data update after undo successfull.'); },
            (_, error) =>
              console.error('Problem in deleting ids from database', error),
            
          );
        });
      },
      error => { console.error('Problem in deleting ids from database', error);},
      () => { console.log('Data update after undo successfull.'); }
    );
  } else {
    db.transaction(tx => {
      deleteids.forEach(taskid => {
        tx.executeSql(
          'delete from work_tasks where taskid=?',
          [taskid.taskid],
          () => {
            tx.executeSql(
              'Insert into TASK_DATA_UPDATE(update_type, workid, taskid, task_pehchan) values(?,?,?,?)',
              [
                'DELETE',
                workid.workidbackend,
                taskid.taskid_backend,
                taskid.taskid,
              ],
              () => {
                console.log('Data update after undo successfull.')
              },
              (_, error) => { console.error('Problem in deleting ids from database updatingdatabase.js', error) }
            );
          },
          (_, error) =>
            Console.error('Problem in deleting ids from database', error),
        );
      }, error => { console.error('Problem in deleting ids from database', error); },
        () => { console.log('Data update after undo successfull.'); });
    });
  }
}
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
            () => { console.log('Updating task in database successfull.'); },
            (_, error) => { console.error('Problem in deleting ids from database updatingdatabase.js', error) }
          );
        })
    }, (error) => { console.error('Problem in deleting ids from database updatingdatabase.js', error)},() => {
        callback();
    });
} else 
    {
      
}
  })
    .catch(error => {
      console.error('updatingdatabase.js',error);
  });
}

export function updatingDatabase(userid, callback) {
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
