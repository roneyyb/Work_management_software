import axios from 'axios';
import SQLite from "react-native-sqlite-storage";
import NetInfo from '@react-native-community/netinfo';

const url = 'http://13.234.204.70:3000';

const db = SQLite.openDatabase('multiutilityapp.db');

function convertingselectdatatoarray(results) {
  const rows = results.rows;
  let users = [];

  for (let i = 0; i < rows.length; i++) {
    users.push({
      ...rows.item(i),
    });
  }
  return users;
}

function sendworkdeletetocloud(userid) {
  db.transaction( tx => {
    tx.executeSql('Select * from WORK_DATA_UPDATE where update_type=? AND workid!=?',['DELETE',""], (td,result) => {
      const  _array = convertingselectdatatoarray(result);
      if(_array.length !== 0)
      {
        axios({
          method: 'DELETE',
          headers: { Authorization:userid },
          url: `${url}/multiworkdelete`,
          data:{ deleteworklist: _array}
        }).then(response => {
          db.transaction(tx => {
            tx.executeSql('delete from WORK_DATA_UPDATE',null, () => {
              tx.executeSql('delete from TASK_DATA_UPDATE');
            });
          }); 
        }).catch(error =>{
        })
      }
      else
      {
        db.transaction(tx => {
          tx.executeSql('Delete from WORK_DATA_UPDATE', null, () => {
            tx.executeSql('delete from TASK_DATA_UPDATE');
          });
        })
      }
    })
  })
}

function senddeletedtaskdatatocloud(userid) {
  try {
    db.transaction(
      tx => {
        tx.executeSql('select * from TASK_DATA_UPDATE where update_type=? AND taskid!=?',['DELETE',""], (td,result) => { 
          const  _array = convertingselectdatatoarray(result);

          if(_array.length!==0) {
            axios({
              method: 'DELETE',
              headers: { Authorization:userid },
              url: `${url}/multitaskdelete`,
              data:{ deletetasklist: _array}
            })
            .then(response => {
              if(response.data.error.length===0)
              {
                sendworkdeletetocloud(userid);    
              }
            })
            .catch(error => {console.log(error);})
          } else {
            sendworkdeletetocloud(userid);
          }
        },(_,error) => {
          console.log('error in task deletion =>',error);
        })
      }
    );
  } catch(error) {
    console.log(error);
  }
};


function sendupdatedtaskdatatocloud(userid) {
  try {
    db.transaction(
      tx => {
        tx.executeSql(
          'select DISTINCT * from TASK_DATA_UPDATE AS wdu JOIN WORK_TASKS AS uw ON wdu.update_type=? AND wdu.workid=uw.workid AND wdu.taskid=uw.taskid',
          ['UPDATE'],
         (td,result) => { const  _array = convertingselectdatatoarray(result);
            if(_array.length!==0) {
            axios({
              method: 'PATCH',
              headers: { Authorization: userid },
              url: `${url}/multitaskupdate`,
              data: { tasklist: _array }
            })
              .then(response => {
                if(response.data.error.length===0)
                {
                senddeletedtaskdatatocloud(userid);
              }
                else{
                  console.log('error in updating new task to cloud',response.data.error);
                }
              })
              .catch(error => {
                console.log('error axios fetch =>', error);
              });
            }
            else {
              //deleteTaskData('UPDATE',userid);
              senddeletedtaskdatatocloud(userid);
            }
          },
          (_, error) => {
            console.log('error in updating WORK_DATA=>', error);
          }
        );
      },
      error => {
        console.log('error while finding data in work', error);
      }
    );
  } catch (error) {
    console.log('updatedatatocloud =>', error);
  }
}

function senddata(taskarray,userid,handlerefresh) {
  axios({
    method: 'post',
    url: `${url}/multitaskcreate/${userid}`,
    data: { tasklist: taskarray }
  })
    .then(response => {
      db.transaction(
        tx => {
          var len = response.data.taskidbackend.length;
          var count = 0;
          response.data.taskidbackend.every(id => {
              tx.executeSql('Update WORK_TASKS set taskid_backend=? where taskid=?',[id.taskid_backend, id.taskid],() => {console.log('update ho gaya');});
              count++;
              if(count===len)
              {
                handlerefresh();
                sendupdatedtaskdatatocloud(userid);
              }
              return true;
          });
        },
        e => {
          console.log(e);
        }
      );
    })
    .catch(error => {
      console.log('error axios fetch =>', error);
    });
} 
function sendnewtaskdatatocloud(userid,handlerefresh) {
  try {
    console.log('sending task data to cloud');
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from TASK_DATA_UPDATE AS wdu JOIN WORK_TASKS AS uw ON wdu.update_type=? AND wdu.workid=uw.workid AND wdu.taskid=uw.taskid',
          ['POST'],
         (td,result) => { 
           const  _array = convertingselectdatatoarray(result);
            if(_array.length!==0) {
                   senddata(_array,userid,handlerefresh);
            }
          else {
            sendupdatedtaskdatatocloud(userid);
          }
          },
          (_, error) => {
            console.log('error in updating WORK_DATA=>', error);
          }
        );
      },
      error => {
        console.log('error while finding data in work', error);
      }
    );
  } catch (error) {
    console.log('updatedatatocloud =>', error);
  }
}

function sendupdatedworkdatatocloud(userid,handlerefresh) {
  try {
    //new work created update to data base
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from WORK_DATA_UPDATE AS wdu JOIN USER_WORKS AS uw ON wdu.update_type=? AND wdu.workid=uw.workid',
          ['UPDATE'],
         (td,result) => { 
           const  _array = convertingselectdatatoarray(result);
            if(_array.length!==0){
            axios({
              method: 'patch',
              url: `${url}/multiworkupdate`,
              headers: { Authorization: userid },
              data: { worklist: _array }
            })
              .then(response => {
                if(response.data.error.length===0) {
                sendnewtaskdatatocloud(userid,handlerefresh);
                }
                else {
                  console.log('error axios patch request =>', error);
                }
              })
              .catch(error => {
                console.log('error axios patch request =>', error);
              });
            }else { sendnewtaskdatatocloud(userid,handlerefresh);
            }
          },
          (_, error) => {
            console.log('error in updating WORK_DATA=>', error);
          }
        );
      }
    );
  } catch (error) {
    console.log('updatedatatocloud =>', error);
  }
}
async function sendnewworkdatatocloud(userid,setworklocaldata,handlerefresh) {
  try {
    console.log('sending work data');
    db.transaction(
      tx => {
        tx.executeSql(
          'select * from WORK_DATA_UPDATE AS wdu JOIN USER_WORKS AS uw ON wdu.update_type=? AND wdu.workid=uw.workid',
          ['POST'],
         (td,result) => { 
           const  _array = convertingselectdatatoarray(result);
            if(_array.length!==0) {
            axios({
              method: 'POST',
              url: `${url}/multiworkcreate/${userid}`,
              data: {
                worklist: _array
              }
            })
              .then(response => {
                if(response.data.error.length ===0)
                {
                  
                    var len = response.data.workidbackend.length;
                    var count = 0;
                    db.transaction(tx => {
                    response.data.workidbackend.every(id => {
                      tx.executeSql('Update USER_WORKS set workid_backend=? where workid=?',[id.workid_backend, id.workid],() => {console.log('update ho gaya');},(_,error) => {console.log('please error batado',error)});
                        tx.executeSql('Update WORK_TASKS set workid_backend=? where workid=?',[id.workid_backend,id.workid],() => {
                            
                        },(_,error) => {console.log('please error batado',error);});
                        count++;
                        if(count===len)
                        {
                          setworklocaldata(response.data.workidbackend);
                          sendupdatedworkdatatocloud(userid,handlerefresh);
                        }
                        return true;
                    });
                    });
                }
                else {
                  console.log('ERROR WHILE UPDATING DATA');
                }
              })
              .catch(error => {
                console.log('error axios fetch =>', error);
              });
            } else {
                sendupdatedworkdatatocloud(userid,handlerefresh);
            }
          },
          (_, error) => {
            console.log('error in updating WORK_DATA=>', error);
          }
        );
      }
    );
  } catch (error) {
    console.log('updatedatatocloud =>', error);
  }
}

const dataupdatedunction = (userid,setworklocaldata,handlerefresh) => {
  sendnewworkdatatocloud(userid,setworklocaldata,handlerefresh);
};
export default function Updatedatatocloud(userid,setworklocaldata= (() => {}),handlerefresh = (() => {})) {
  //console.log('updating data to cloud => =>');
  NetInfo.fetch().then(state => {
    //if (state.isConnected) {
      console.log('updating data to cloud => =>');      
      dataupdatedunction(userid,setworklocaldata,handlerefresh);
    //}
  });
}
