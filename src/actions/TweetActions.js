import {
    ADD_TWEET_FAILD,
    ADD_TWEET_START,
    ADD_TWEET_SUCCESS,


    GET_TWEET_START,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAILD
} from './types'
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../RootNavigation';

import { Alert } from 'react-native'


export const getTweets = () => {
    return (dispatch) => {
        dispatch({ type: GET_TWEET_START });
        // firestore().collection('Tweets').get().then((tweets) => {
        //     let data = [];
        //     tweets.forEach((doc) => {
        //         data.push(doc.data())
        //     });

        //     console.log('Twitler neler: ', data);

        //     dispatch({ type: GET_TWEET_SUCCESS, payload: data });

        // }).catch(error => {
        //     console.log('tweetleri çekerken hata aldık:', error);
        //     dispatch({ type: GET_TWEET_FAILD });
        // })
        firestore().collection('Tweets').onSnapshot(tweets => {
            console.log('tweet data: ', tweets);
            let data = [];
            tweets.forEach((doc) => {
                data.push(doc.data())
            });
            console.log('data: ', data);
            dispatch({ type: GET_TWEET_SUCCESS, payload: data });
            
          });
    }
}


export const addTweet = (params) => {
    return (dispatch) => {
        dispatch({ type: ADD_TWEET_START })
        firestore()
            .collection('Tweets')
            .add(params)
            .then((data) => {
                console.log('Tweet added!', data);
                dispatch({ type: ADD_TWEET_SUCCESS, payload: params })
                RootNavigation.pop()
            }).catch(() => {
                dispatch({ type: ADD_TWEET_FAILD })
                console.log('Tweet not Add!');
            })

    }
}
