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
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';

import { Alert } from 'react-native'


// import { post } from './api'

export const login = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '') {
            if (validateEmail(params.email)) {
                auth()
                    .signInWithEmailAndPassword(params.email, params.password)
                    .then((user) => {
                        console.log('signed in!', user);
                    })
                    .catch(error => {
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');

                        } else if (error.code === 'auth/user-not-found') {
                            
                            console.log('That email address is invalid!');
                            Alert.alert('Uyarı', 'Böyle bir kullanıcı bulunamadı!')
                        }
                        console.log(error.code );

                    })
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
            if (validateEmail(params.email)) {
                auth()
                    .createUserWithEmailAndPassword(params.email, params.password)
                    .then((user) => {
                        console.log('User account created', user);
                        RootNavigation.pop()
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }
                        console.log(error);
                    });




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

