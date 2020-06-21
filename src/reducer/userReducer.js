import { SET_UP_USER_ON_START, UPDATE_DEFAULT_WORK } from '../actions/types';
import { user } from '../onLoad/UserDetails';

const initialState = { user:{...user} };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UP_USER_ON_START:
            state.user = action.payload;
            return state;
        case UPDATE_DEFAULT_WORK:
            state.user.work = action.payload;
            return state;
        default:
            return state;
    }
}

export default userReducer;

