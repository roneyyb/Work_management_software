import {combineReducers} from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import workReducer from './workReducer';

export default appReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  worklist: workReducer
});

