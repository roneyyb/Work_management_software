import {combineReducers} from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import worklistreducer from './workReducer';
import createdatabasereducer from './databaseReducer';

export default combineReducers({
  user: userReducer,
  task: taskReducer,
  worklist: worklistreducer,
  createdatabase: createdatabasereducer,
});
