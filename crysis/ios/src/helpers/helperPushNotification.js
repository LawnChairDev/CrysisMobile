import {
  PushNotificationIOS
 } from 'react-native'
 import { sendDeviceToken } from './helperAPI';
 // import { getFromStorage, setToStorage } from './helperLocalStorage';

export function registerPush(self){
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', function(token){
    console.log('You are registered and your deviceToken is ', token);
    if(self.state.isAuthenticated){
      console.log('we are authenticated');
      return sendDeviceToken(token)
    }
  });
}

export function attachDeviceToken(loginObj){
  var userToken = getFromStorage('deviceToken');
  loginObj.userToken = userToken;
  }
