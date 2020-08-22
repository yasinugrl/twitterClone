import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import { Input, Button } from '../../components'
import { connect } from 'react-redux';
import { register } from '../../actions'

const Register = (props) => {

    const [firstName, setFirstname] = useState('Kodluyoruz')
    const [lastName, setLastname] = useState('34')
    const [email, setEmail] = useState('test34@test.com')
    const [password, setPassword] = useState('123456')

    return (
        <ScrollView>
            <View style={{
                alignItems: 'center',
                paddingTop: 30,
                flex: 1
            }}>

                <Input
                    placeholder='firstname'
                    value={firstName}
                    onChangeText={(value) => setFirstname(value)}
                />

                <Input
                    placeholder='lastname'
                    value={lastName}
                    onChangeText={(value) => setLastname(value)}
                />

                <Input
                    placeholder='email'
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <Input
                    placeholder='password'
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry
                />

                <Button
                    text={'Register'}
                    loading={props.loading}
                    style={{ height: 40 }}
                    onPress={() => {
                        const params = {
                            email,
                            password,
                            firstName,
                            lastName
                        } 
                        props.register(params)
                    }}
                />

            </View>
        </ScrollView>
    )
}


const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { register })(Register);
