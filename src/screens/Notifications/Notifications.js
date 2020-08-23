import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import { getList, removeData } from '../../actions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Notifications = (props) => {

    useEffect(() => {
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => props.navigation.navigate('NotificationDetail')}>Notifications screen</Text>
        </View>
    );
}

const styles = {
    text: { padding: 3 }
}




const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
};

export default connect(mapStateToProps, { getList, removeData })(Notifications);