import SQLite from "react-native-sqlite-storage";;

const db = SQLite.openDatabase('multiutilityapp.db');

export default function logout() {
    db.transaction(tx => {
        tx.executeSql('Drop table if exists TASK_IMAGES', null, () => {
            tx.executeSql('Drop table if exists WORK_TASKS', null, () => {
              tx.executeSql('Drop table if exists USER_WORKS', null, () => {
                tx.executeSql('Drop table if exists TASK_DATA_UPDATE', null, () => {
                   tx.executeSql('Drop table if exists WOKR_DATA_UPDATE', null, () => {
               
                   });  
                });
              });
            });
          });
    },(error) => {console.log('drop table datbase',error)},() => {console.log('All table droped and logout success')})
}
