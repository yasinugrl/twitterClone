import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Fab, Icon } from 'native-base';
import { colors } from '../../style';

import { getTweets } from '../../actions'
import TweetItems from '../Tweets/TweetItems';

const Home = (props) => {

    useEffect(() => {
        props.getTweets()
    }, [])

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                style={{ flex: 1, backgroundColor: 'white', }}
                data={props.tweets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <TweetItems
                        data={item}
                        index={index}
                    />
                }
            />


            <Fab
                containerStyle={{}}
                style={{ backgroundColor: colors.main }}
                position="bottomRight"
                onPress={() => { props.navigation.navigate('AddTweet') }}>
                <Icon name="pencil" type='FontAwesome' style={{ color: 'white' }} />
            </Fab>

        </View>
    );
}

const styles = {
    text: { padding: 3 }
}




const mapStateToProps = ({ tweetResponse }) => {
    const { loading, tweets } = tweetResponse;
    return { loading, tweets };
};

export default connect(mapStateToProps, { getTweets })(Home);