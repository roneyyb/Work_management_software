import { SET_UP_USER_ON_START} from '../actions/types';
import { combineReducers } from 'redux';
import { user } from '../onLoad/UserDetails';

const INITIAL_STATE = {...user};

const userReducer =  (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_UP_USER_ON_START:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({ user: userReducer });