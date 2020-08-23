import React, { useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signOut} from '../../actions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Messages = (props) => {

    useEffect(() => {
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => {
                // props.navigation.navigate('MessageDetail')
                props.signOut()
                
            }}>Messages screen</Text>
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

export default connect(mapStateToProps, { signOut })(Messages);