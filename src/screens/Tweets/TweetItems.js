import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { colors } from '../../style';
import { connect } from 'react-redux';

const TweetItems = (props) => {


    const iconSection = (isText, name, value, onPress) => {
        let isActive;
        name == 'comment' ?
            isActive = value.filter((data) => data.uid == props.user.uid) :
            isActive = value.filter((uid) => uid == props.user.uid)

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    type='FontAwesome'
                    name={name}
                    style={{ fontSize: 18, color: isActive.length > 0 ? name == 'heart' ? 'red' : 'green' : 'gray' }}
                    onPress={onPress}
                />
                {isText ? <Text style={{ fontSize: 12, marginLeft: 5 }}>{value.length}</Text> : null}
            </View>
        )
    }


    const { fav, retweet, comment, tweet, user, uid } = props.data;


    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log('item click')
            }
            style={{ padding: 20, borderBottomWidth: 0.5, borderColor: colors.line, flexDirection: 'row' }}>

            <View style={{ flex: 1.5 }}>
                {
                    user.profile_url ?
                        <TouchableOpacity
                            onPress={() => { }}>
                            <Image
                                source={{ uri: user.profile_url }}

                                style={{ width: 40, height: 40 }}
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>
                        :
                        <Icon name={'user-circle'} />
                }
            </View>

            <View style={{ flex: 9, marginLeft: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.name}<Text style={{ color: colors.line, fontWeight: '100', fontSize: 10 }}>  @{user.username} . 1 gün</Text></Text>

                <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 10 }}>{tweet.text}</Text>

                {tweet.image &&
                    <View>
                        <Image source={{ uri: tweet.image }} style={{ width: '100%', height: 150 }} resizeMode='cover' />
                    </View>
                }

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 100, marginTop: 10 }}>
                    {iconSection(true, 'comment', comment, () => { })}
                    {iconSection(true, 'retweet', retweet, () => { })}
                    {iconSection(true, 'heart', fav, () => {

                    })}
                    {iconSection(false, 'share-square', [])}
                </View>
            </View>

        </TouchableOpacity>
    )
}


const mapStateToProps = ({ authResponse }) => {
    const { user } = authResponse;
    return { user };
};

export default connect(mapStateToProps, {})(TweetItems);
