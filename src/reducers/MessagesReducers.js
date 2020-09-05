import {
    GET_MESSAGES_START,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILD,

    ADD_MESSAGES_START,
    ADD_MESSAGES_SUCCESS,
    ADD_MESSAGES_FAILD,


    GET_ROOM_START,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAILD,

    ADD_ROOM_FAILD,
    ADD_ROOM_START,
    ADD_ROOM_SUCCESS,


    GET_ALL_USER_START,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILD

} from '../actions/types';

const INITIAL_STATE = {
    loadingGetRoom: false,
    rooms: [],

    loadingUsers: false,
    allUsers: [],

    getMessages: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ROOM_START:
            return {
                ...state, loadingGetRoom: true
            };
        case GET_ROOM_SUCCESS:
            return {
                ...state, loadingGetRoom: false, rooms: action.payload
            };
        case GET_ROOM_FAILD:
            return {
                ...state, loadingGetRoom: false
            };


        case GET_ALL_USER_START:
            return {
                ...state, loadingUsers: true
            };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state, loadingUsers: false, allUsers: action.payload
            };
        case GET_ALL_USER_FAILD:
            return {
                ...state, loadingUsers: false
            };



        case GET_MESSAGES_SUCCESS:
            return {
                ...state, getMessages: action.payload
            };



        default:
            return state;
    }
};