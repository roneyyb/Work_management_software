import { SET_UP_USER_ON_START } from '../actions/types';
import { combineReducers } from 'redux';
import { user } from '../onLoad/UserDetails';

const initialState = { user };
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_UP_USER_ON_START:
            return state.user = action.payload;
        default:
            return state;
    }
}

