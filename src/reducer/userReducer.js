import {SET_UP_USER_ON_START, UPDATE_DEFAULT_WORK} from '../actions/types';
import produce from 'immer';
import {combineReducers} from 'redux';

const initialState = {
  user: {
    _id: '',
    email: '',
    work: '',
    username: '',
  },
};

const setupReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_UP_USER_ON_START:
      const {_id, work, username, email} = action.payload;
          draft._id = _id;
          draft.work = work;
          draft.username = username;
          draft.email = email;
          break;
    case UPDATE_DEFAULT_WORK:
      draft.work = action.payload;
      break;
  }
}, initialState.user);

const userReducer = combineReducers({
  user: setupReducer,
});

export default userReducer;
