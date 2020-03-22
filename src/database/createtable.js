import SQLite from "react-native-sqlite-storage";

import uuidv1 from 'uuid/v1';
import {
  CREATING_DATABASE,
  DEFAULT_WORK,
  ON_SIGNUP_DEFAULT_WORK
} from '../actions/types';
import Logout from './droptable';
const db = SQLite.openDatabase('multiutilityapp.db');

export const createDatabase = (work,actionaftercom,signup) => {
  console.log(work);
  Logout();
  return dispatch => {
    console.log('create Database called');
    dispatch({
      type: CREATING_DATABASE,
      payload: true
    });
    console.log('above db transaction');

    db.transaction(tx => {

     // console.log('All table droped');
                tx.executeSql(
                  'CREATE TABLE USER_WORKS (workid text primary key not null, workid_backend text,work_title varchar(200),work_selected integer default 0, work_created text, work_deadline text);',
                  null,
                  (_, created) => {
                    console.log('USER_WORK table created', created);
                    tx.executeSql(
                      'CREATE TABLE if not exists WORK_TASKS (taskid text primary key not null,workid_backend text, taskid_backend text, workid text not null , task_title VARCHAR(160), task_description text ,task_createdAt text, task_updatedAt text, task_deadline text, task_reminder text, task_notificationid text, task_completedAt blob, task_completed integer default 0 not null,foreign key(workid) references USER_WORKS(workid) on delete cascade);',
                      null,
                      () => {
                        console.log('WORK_TASK table created');
                        tx.executeSql(
                          'CREATE TABLE IF NOT EXISTS TASK_IMAGES(image_id text not null primary key,image string, type string, taskid_backend text,task_id integer not null, image_created string, foreign key(task_id) references WORK_TASK(task_id) on delete cascade);',
                          null,
                          () => {
                            console.log('-------All table created-------');
                            console.log('-------Now creating dataupdate table------');
                            tx.executeSql('create table if not exists WORK_DATA_UPDATE (update_type varchar(7), workid text not null)'
                            , null,
                            () => {
                              tx.executeSql('create table if not exists TASK_DATA_UPDATE (update_type varchar(7), workid text, taskid text, task_pehchan text)',null, () => {
                                console.log('Task update and work_update table successfuly created');
                              }, (_,error) => {console.log(error);});
                            },(error) => {console.log(error);0});
                            if(signup){
                            console.log('-----Inserting default work details----');
                            const uuid = uuidv1();
                            console.log('work is =>', { ...work, uuid });
                            console.log('workid for default work is', uuid);
                            tx.executeSql(
                              'Insert into USER_WORKS(workid, work_title, work_created, work_selected,workid_backend) values(?,?,datetime(),?,?)',
                              [work.workid, work.work_title, 1,work._id],
                              (_, details) => {
                                 console.log('-----default work inserted-----');
                                 tx.executeSql('Select * from USER_WORKS', null,(td, results) => {
                                  //console.log('inside give_all_work action array=>',results.rows);
                                  const rows = results.rows;
                                let users = [];
                        
                                for (let i = 0; i <= rows.length; i++) {
                                  if(i===rows.length) {
                                               console.log('users =>',users);
                                               dispatch({
                                                type: DEFAULT_WORK,
                                                payload: { work: users[0] }
                                              });  
                                              console.log('DEFAULT WORK SENT');
                                              dispatch({
                                                type:ON_SIGNUP_DEFAULT_WORK,
                                                payload:users[0]
                                              });
                                             actionaftercom();
                                             db.close();
                                              return;
                                  } else {
                                  users.push({
                                    ...rows.item(i),
                                  });
                                }
                                }
                                
                                  
                                 }, (_, error) => {
                                   console.log('Returning work failed error is =>', error);
                                 });
                           },
                              (_, error) => {
                                console.log(error);
                              }
                            );
                            } else{
                              actionaftercom();
                              db.close();
                            }
                          },
                          (_, error) => {
                            console.log(
                              'Task Image table not created error',
                              error
                            );
                          }
                        );
                      },
                      (_, error) => {
                        console.log('Work task table not created error', error);
                      }
                    );
                  },
                  ( error) => {
                    console.log('Table not created error =>', error);
                  }
                );
      console.log('started creating table');
      
    });
  };
};
