import {combineReducers} from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskshowreducer';
import worklistreducer from './worklistreducer';
import createdatabasereducer from './createdatabasereducer';

export default combineReducers({
  user: userReducer,
  task: taskReducer,
  worklist: worklistreducer,
  createdatabase: createdatabasereducer,
});
