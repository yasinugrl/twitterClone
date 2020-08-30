import {
    ADD_TWEET_FAILD,
    ADD_TWEET_START,
    ADD_TWEET_SUCCESS,


    GET_TWEET_START,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAILD
} from './types'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
        firestore().collection('Tweets').orderBy('createdDate', 'desc').onSnapshot(tweets => {
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
                let tweetId = data.id

                if (params.tweet.image) {
                    const reference = storage().ref(`/tweets/${tweetId}`);

                    reference.putFile(params.tweet.image).then(() => {

                        reference.getDownloadURL().then((imageURL) => {
                            console.log('asdurllll', imageURL);

                            firestore().collection('Tweets').doc(tweetId).update({ tweet: { image: imageURL, text: params.tweet.text } }).then(() => {
                                dispatch({ type: ADD_TWEET_SUCCESS, payload: params })
                                RootNavigation.pop()
                            })
                        })
                    }).catch(error => {
                        console.log('Hatatta Resim Yükleme: ', error);
                    })
                } else {
                    dispatch({ type: ADD_TWEET_SUCCESS, payload: params })
                    RootNavigation.pop()
                }

            }).catch(() => {
                dispatch({ type: ADD_TWEET_FAILD })
                console.log('Tweet not Add!');
            })

    }
}
