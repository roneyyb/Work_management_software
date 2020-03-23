import SQLite from "react-native-sqlite-storage";
import { FETCH_SUCCESS_WORK_LIST, FETCH_FAIL_WORK_LIST, LOADING_DATA_FAIL, LOADING_UP_DATA, LOADING_DATA_SUCCESS, GET_ATTACHMENT } from '../actions/types';

const db = SQLite.openDatabase('multiutilityapp.db');


export const Give_all_work = () => {
  console.log('Give all work');
  return dispatch => {
    db.transaction(tx => {
      console.log('inside database')
      tx.executeSql(
        'Select * from USER_WORKS;',
        null,
        (td, results) => {
          console.log('inside give_all_work action array=>',results.rows);
          const rows = results.rows;
        let users = [];

        for (let i = 0; i <= rows.length; i++) {
          if(i===rows.length) {
                       console.log('users =>',users);
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
    },(error) => {
      console.log('error give allwork', error);
    }, () => { console.log('transaction success'); });
  };
};

export const Give_all_image = (taskid) => {
  console.log('give_all_images =>',taskid);
  return dispatch => {
    var attachment = [];
    db.transaction(tx => {
        tx.executeSql(`Select * from TASK_ATTACHMENT where task_id=?`, [taskid], (_,results) => {
         const rows = results.rows;
         attachment = rows;
       console.log(rows.length);
       let images = [];
       console.log('sdf');
       let document = [];
       console.log('===  Attachment ===');
       for (let i = 0; i <= rows.length; i++) {
         console.log(rows[i].type);
         if(rows[i].type==='document') {
           document.push(rows[i]);
         } else {
           images.push(rows[i]);
         }
         if(i===(rows.length)) {
           return dispatch({
             type:GET_ATTACHMENT,
             payload: {images, document}
           });
         }
      }
      //  rows.forEach((item,i) => {
      //    console.log('inside',item.attachment_name);
      //    if(item.type==='document') {
      //      document.push(item);
      //    } else {
      //      images.push(item);
      //    }
      //    if(i===(rows.length-1)) {
      //      return dispatch({
      //        type:GET_ATTACHMENT,
      //        payload: {images, document}
      //      });
      //    }
      //  });
       console.log('completed');
        }, (_, error) => {
          console.log('error =>', error);
            return dispatch({
                type: LOADING_DATA_FAIL,
                payload: error
              });  
        });
    }, (error) => { console.log('Give all task error select.js=>',error); }, () => { console.log('transaction succe    ssful'); });
};
};

export const Give_all_task = (completed, workid, sortBy) => {
    let task_completed = 0;
     console.log('completed, workid, sortBy', completed, workid, sortBy);
      if (completed)
       { task_completed = 1; } 
      else 
      {task_completed = 0; }
    return dispatch => {
        dispatch({ type: LOADING_UP_DATA });
        db.transaction(tx => {
            tx.executeSql(`Select * from WORK_TASKS where task_completed=? and workid=? ORDER BY task_createdAt ${sortBy === 'myOrder' ? 'ASC' : 'DESC'}`, [task_completed, workid ], (_,results) => {
             console.log('inside give_all_work action array=>',results.rows);
             const rows = results.rows;
           let users = [];
   
           for (let i = 0; i <= rows.length; i++) {
             if(i===rows.length) {
                          console.log('users =>',users);
              
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
        }, (error) => { console.log('Give all task error select.js=>',error); }, () => { console.log('transactionsuccessful'); });
    };
};

