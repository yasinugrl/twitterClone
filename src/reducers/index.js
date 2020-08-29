import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListReducers from './ListReducers';
import TweetRerducers from './TweetRerducers';

export default combineReducers({
    authResponse: AuthReducers,
    charactersResponse: ListReducers,
    tweetResponse: TweetRerducers
});