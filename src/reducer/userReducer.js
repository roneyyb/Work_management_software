import { SET_UP_USER_ON_START } from '../actions/types';
import { combineReducers } from 'redux';
import { user } from '../onLoad/UserDetails';

const initialState = { user };
export default (state = initialState, action) => {
    console.log(initialState,state);
    switch (action.type) {
        case SET_UP_USER_ON_START:
            state.user = action.payload;
            return state;
        default:
            return state;
    }
}

