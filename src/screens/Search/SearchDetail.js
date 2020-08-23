import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

const SearchDetail = (props) => {

    useEffect(() => {
    }, [])



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Search Detail screen</Text>
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

export default connect(mapStateToProps, {  })(SearchDetail);