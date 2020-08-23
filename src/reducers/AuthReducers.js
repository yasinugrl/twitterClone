import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,

    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD,

    SIGN_OUT_SUCCESS

} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    user: null
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_START:
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            };


        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };

        case LOGIN_FAILD:
        case REGISTER_FAILD:
            return {
                ...state,
                loading: false,
            };

        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: null,
            };


        default:
            return state;
    }
};