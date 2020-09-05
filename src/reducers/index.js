import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListReducers from './ListReducers';
import TweetRerducers from './TweetRerducers';
import MessagesReducers from './MessagesReducers';

export default combineReducers({
    authResponse: AuthReducers,
    charactersResponse: ListReducers,
    tweetResponse: TweetRerducers,
    messageResponse: MessagesReducers
});