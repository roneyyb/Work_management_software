import { combineReducers } from 'redux';
import Signupreducer from './Signupreducer';
import Loginreducer from './loginreducer';
import createtaskreducer from './createtaskreducer';
import taskshowreducer from './taskshowreducer';
import worklistreducer from './worklistreducer';
import createdatabasereducer from './createdatabasereducer';

export default combineReducers({
  auth: Loginreducer,
  signup: Signupreducer,
  task: createtaskreducer,
  show: taskshowreducer,
  worklist: worklistreducer,
  createdatabase: createdatabasereducer
});
