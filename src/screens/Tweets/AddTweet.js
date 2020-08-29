import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Button, Input } from '../../components';
import { colors } from '../../style';
import { Icon } from 'native-base';
import { addTweet } from '../../actions'

import { connect } from 'react-redux';

const AddTweet = (props) => {

    const [tweet, setTweet] = useState('')

    console.log('Gelen: ', props.user.username);
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Button
                    text={'Tweetle'}
                    loading={props.loading}
                    textStyle={{ fontSize: 14 }}
                    onPress={() => {
                        props.addTweet({
                            tweet: {
                                text: tweet,
                                image: null
                            },
                            user: {
                                profile_url: props.user.profile_image,
                                name: props.user.name,
                                username: props.user.username
                            },
                            fav: 0,
                            retweet: 0,
                            comment: 0,
                        })
                    }}
                    style={{ width: '20%', height: 30 }}
                />
            </View>

            <View style={{ flex: 12, padding: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name={'user'} type='FontAwesome' size={40} onPress={() => { }} />

                    <Input
                        placeholder='Neler oluyor?'
                        style={{ flex: 1, height: 100, padding: 10 }}
                        value={tweet}
                        onChangeText={(tweet) => setTweet(tweet)}
                        autoFocus
                        multiline
                    />
                </View>

            </View>
       
        </SafeAreaView>
    )
}


const mapStateToProps = ({ authResponse, tweetResponse }) => {
    const { user } = authResponse;
    return { user, loading: tweetResponse.loading };
};

export default connect(mapStateToProps, { addTweet  })(AddTweet);
