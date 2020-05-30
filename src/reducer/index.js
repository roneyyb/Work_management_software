import { combineReducers } from 'redux';
import  userReducer from './userReducer';
import createtaskreducer from './createtaskreducer';
import taskshowreducer from './taskshowreducer';
import worklistreducer from './worklistreducer';
import createdatabasereducer from './createdatabasereducer';

export default combineReducers({
  user: userReducer,
  task: createtaskreducer,
  show: taskshowreducer,
  worklist: worklistreducer,
  createdatabase: createdatabasereducer
});
