import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { Input, Button } from '../../components'

import { getMessages, addMessages } from '../../actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';


const { width } = Dimensions.get('window');

const MessageDetail = (props) => {

    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log('props value: ', props.route.params.data.path);
        props.getMessages(props.route.params.data.path)

    }, [])

    return (
        <View style={MessageStyle.container}>
            <View style={MessageStyle.messageListContainer}>
                <FlatList
                    data={props.all_messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        console.log('Liste gelen: ', item);
                        let isMe = props.user.username == item.sender_user.username

                        const user_first_letter = !isMe  ? item.sender_user.name.charAt(0) : ''


                        return (
                            <View style={[MessageStyle.messageItemContainer, { justifyContent: isMe ? 'flex-end' : 'flex-start' }]}>
                                {isMe ?
                                    null :
                                    <View style={MessageStyle.profileCircle}>
                                        <Text style={{ color: 'black' }}>{user_first_letter}</Text>
                                    </View>
                                }
                                <View style={[{ backgroundColor: isMe ? '#1da1f2' : '#cc8931', width: item.text.length > 40 ? width - 100 : null }, MessageStyle.bubleStyle]}>
                                    <Text style={{ color: 'white' }}>{item.text}</Text>
                                </View>

                            </View>
                        )
                    }}
                    inverted
                />
            </View>

            <View style={MessageStyle.inputContainerStyle}>
                <Input
                    placeholder='mesaj yaz...'
                    style={{ flex: 1, height: 30, padding: 5, borderBottomWidth: 0 }}
                    value={message}
                    maxLength={100}
                    onChangeText={(tweet) => setMessage(tweet)}
                    multiline
                />
                <TouchableOpacity
                    onPress={() => {
                        const params = {
                            text: message,
                            createdDate: new Date(),
                            receiver_user: props.route.params.data.second_user,
                            sender_user: props.user
                        }
                        props.addMessages(props.route.params.data.path, params)
                        setMessage('')

                    }}
                    style={{ marginBottom: 10 }}
                >
                    <Icon name='send' type='FontAwesome' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const MessageStyle = {
    container: { flex: 1 },
    inputContainerStyle: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    messageListContainer: { flex: 15, backgroundColor: 'white' },
    inputStyle: { width: width - 110, height: 50 },
    sendButtonStyle: { width: width / 7, height: width / 7 },
    messageItemContainer: { padding: 10, flexDirection: 'row' },
    profileCircle: { height: 40, width: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: 'black' },
    bubleStyle: { marginLeft: 20, padding: 10, borderRadius: 10 }
}




const mapStateToProps = ({ authResponse, messageResponse }) => {
    const { user } = authResponse;
    return { user, all_messages: messageResponse.getMessages };
};

export default connect(mapStateToProps, { getMessages, addMessages })(MessageDetail);