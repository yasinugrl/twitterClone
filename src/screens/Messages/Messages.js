import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Fab, Icon } from 'native-base';
import { colors } from '../../style';

import { getRooms } from '../../actions'

import MessageItems from './MessageItems';

const Messages = (props) => {

    useEffect(() => {
        props.getRooms()
    }, [])

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                style={{ flex: 1, backgroundColor: 'white', }}
                data={props.rooms}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ alignItems: 'center', padding: 20}}>
                                <Text>Herhangi bir mesaj bulunamadı</Text>
                        </View>
                    )
                }}
                renderItem={({ item, index }) =>
                    <MessageItems
                        data={item}
                        index={index}
                        props={props}
                    />
                }
            />


            <Fab
                containerStyle={{}}
                style={{ backgroundColor: colors.main }}
                position="bottomRight"
                onPress={() => { props.navigation.navigate('GetUsers') }}>
                <Icon name="plus" type='FontAwesome' style={{ color: 'white' }} />
            </Fab>

        </View>
    );
}

const styles = {
    text: { padding: 3 }
}




const mapStateToProps = ({ messageResponse }) => {
    const { loadingGetRoom, rooms } = messageResponse;
    return { loadingGetRoom, rooms };
};

export default connect(mapStateToProps, { getRooms })(Messages);