import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';


import { AuthContext } from './context'



import Login from './screens/Auth/Login'
import Register from './screens/Auth/Register'

import HomeScreen from './screens/Home/Home'
import HomeDetail from './screens/Home/HomeDetail'

import SearchScreen from './screens/Search/Search'
import SearchDetail from './screens/Search/SearchDetail'


import NotificationsScreen from './screens/Notifications/Notifications'
import NotificationsDetail from './screens/Notifications/NotificationsDetail'



import MessagesScreen from './screens/Messages/Messages'
import MessageDetail from './screens/Messages/MessageDetail'
import GetUsers from './screens/Messages/GetUsers'


import Menu from './screens/Menu/Menu'


import AddTweet from './screens/Tweets/AddTweet'


import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_AUTH_ID, USER } from './actions/types';
import FirstScreen from './screens/Auth/FirstScreen';
import Notifications from './screens/Notifications/Notifications';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { colors } from './style';



const menu = (navigation) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.openDrawer()
            }}
            style={{
                marginLeft: 10
            }}
        >
            <Icon name='user' type='FontAwesome' />
        </TouchableOpacity>
    )
}

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName='FirstScreen'>
            <AuthStack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}

            />

            <AuthStack.Screen
                name="Login"
                component={Login}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}
            />


            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerShown: false
                }}
            />

        </AuthStack.Navigator>
    )
}


const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => menu(navigation),
                })}
            />

            <HomeStack.Screen name="HomeDetail" component={HomeDetail} />
        </HomeStack.Navigator>
    )
}


const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name="Search"
                component={SearchScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => menu(navigation),
                })}
            />
            <SearchStack.Screen name="SearchDetail" component={SearchDetail} />
        </SearchStack.Navigator>
    )
}


const NotificationsStack = createStackNavigator();
const NotificationsStackScreen = () => {
    return (
        <NotificationsStack.Navigator>
            <NotificationsStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => menu(navigation),
                })}
            />
            <NotificationsStack.Screen name="NotificationDetail" component={NotificationsDetail} />
        </NotificationsStack.Navigator>
    )
}


const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
    return (
        <MessagesStack.Navigator>
            <MessagesStack.Screen
                name="Messages"
                component={MessagesScreen}
                options={({ navigation, route }) => ({
                    headerLeft: () => menu(navigation),
                })}
            />
            <MessagesStack.Screen name="MessageDetail" component={MessageDetail} />

            <MessagesStack.Screen name="GetUsers" component={GetUsers} />
        </MessagesStack.Navigator>
    )
}


const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Notifications') {
                        iconName = 'bell';
                    } else if (route.name === 'Messages') {
                        iconName = 'envelope-open';
                    }

                    return <Icon type='FontAwesome' name={iconName} style={{ color: focused ? colors.main : color, fontSize: size }} />;
                },
            })}
            tabBarOptions={{
                inactiveTintColor: 'gray',
                showLabel: false,
            }}

        >

            <TabStack.Screen name="Home" component={HomeStackScreen} />
            <TabStack.Screen name="Search" component={SearchStackScreen} />
            <TabStack.Screen name="Notifications" component={NotificationsStackScreen} />
            <TabStack.Screen name="Messages" component={MessagesStackScreen} />


        </TabStack.Navigator>
    )
}

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={Menu}
            drawerType='back'
            drawerStyle={{
                width: '85%',
            }}
        >
            <DrawerStack.Screen name="Drawer" component={TabStackScreen} />
        </DrawerStack.Navigator>
    )
}


const RootStack = createStackNavigator();


function Router(props) {
    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator headerMode='none' mode="modal">
                {
                    props.user ?
                        (
                            <>
                                <RootStack.Screen
                                    name="Main"
                                    component={DrawerStackScreen}
                                    options={{
                                        animationEnabled: false
                                    }}
                                />
                                <RootStack.Screen name="AddTweet" component={AddTweet} />
                            </>

                        ) :
                        (<RootStack.Screen
                            name="Auth"
                            component={AuthStackScreen}
                            options={{
                                animationEnabled: false
                            }}
                        />)
                }
            </RootStack.Navigator>
        </NavigationContainer>
    );
}


const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, {})(Router);
