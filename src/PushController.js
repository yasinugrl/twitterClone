import React, { Component } from 'react';
import { Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './RootNavigation';
import { USER } from './actions/types';


class PushController extends Component {
  async configure(onRegister) { 
    
          try {
            await messaging().requestPermission();
            // User has authorised
          } catch (error) {
              // User has rejected permissions
          }
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
              onRegister(fcmToken);
          } else {
              // user doesn't have a device token yet
          }
      
        messaging().onNotificationOpenedApp((notificationOpen) => {
            console.log('onNotificationOpenedApp', notificationOpen.data);
            this.navigatePush(notificationOpen.data)

             
        });
      
      
        messaging().getInitialNotification()
          .then((notificationOpen) => {
              console.log('getInitialNotification', notificationOpen.data);
                this.navigatePush(notificationOpen.data)

              
           
          });
  }

  navigatePush(data) {
    switch (data.type) {
        case 'messageDetail':
            console.log('Burda***');
            USER.notif= data;
            RootNavigation.navigate('Messages');
            break;
    
        default:
            break;
    }
    
  }


  render() {
    return null;
  }
}
export default PushController;