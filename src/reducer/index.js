import {combineReducers} from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import workReducer from './workReducer';
import createdatabasereducer from './databaseReducer';

export default combineReducers({
  user: userReducer,
  task: taskReducer,
  worklist: workReducer,
  createdatabase: createdatabasereducer,
});
