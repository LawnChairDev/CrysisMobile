import {
  PushNotificationIOS
 } from 'react-native'
 import { getFromStorage, setToStorage } from './helperLocalStorage';

export function registerPush(){
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', function(token){
    console.log('You are registered and your deviceToken is ', token);
    setToStorage('deviceToken', token)
  });
}

export function attachDeviceToken(loginObj){
  var userToken = getFromStorage('deviceToken');
  loginObj.userToken = userToken;
  })
}
