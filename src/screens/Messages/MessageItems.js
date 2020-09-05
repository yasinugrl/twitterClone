import React from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import { connect } from 'react-redux';



const MessageItems = (props) => {

    console.log('Gelen data: ', props.data);

    const isSecond = props.data.second_user.username == props.user.username

    return (
        <TouchableOpacity
            onPress={() => {
                RootNavigation.navigate('MessageDetail', { data: props.data  } )
            }}
            style={{ flexDirection: 'row', margin: 10, borderBottomWidth: 0.4, borderBottomColor: 'gray' }}>
            <Image
                source={{ uri:  isSecond ? props.data.first_user.profile_image : props.data.second_user.profile_image}}
                style={{ width: 50, height: 50, borderRadius: 25 }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{isSecond ? props.data.first_user.name : props.data.second_user.name}</Text>
                <Text style={{ fontSize: 12 }}>@{isSecond ? props.data.first_user.username: props.data.second_user.username}</Text>
            </View>

        </TouchableOpacity>
    );
}


const mapStateToProps = ({ authResponse }) => {
    const { user } = authResponse;
    return { user };
};

export default connect(mapStateToProps, { })(MessageItems);
