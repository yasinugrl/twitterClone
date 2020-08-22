import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,

    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD,

    BASE_URL
} from './types'
import AsyncStorage from '@react-native-community/async-storage'

import { Alert } from 'react-native'

// import { post } from './api'


export const login = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '') {
            if(validateEmail(params.email )) {
                
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }

    }
}

export const register = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '' && params.firstname != '' && params.lastname != '') {
            if(validateEmail(params.email )) {
                
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

