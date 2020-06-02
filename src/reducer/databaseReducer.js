import { CREATING_DATABASE, DATABASE_CREATED } from '../actions/types';

const INITIAL_STATE = {
    creating_database : false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATING_DATABASE:
            return { ...state, creating_database: true };
        case DATABASE_CREATED:
            return { ...state, creating_database: false };
        default:
            return state;
    }
};