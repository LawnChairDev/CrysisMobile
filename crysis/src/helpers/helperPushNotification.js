import {
  PushNotificationIOS,
  AsyncStorage
 } from 'react-native'
 import { getFromStorage, setToStorage } from './helperLocalStorage';

export function registerPush(){
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', function(token){
    console.log('You are registered and your deviceToken is ', token);
    AsyncStorage.setItem('deviceToken', token)
    .then(function(){
      console.log('your deviceToken was stored in the phone storage');
    })
    .catch(function(){
      console.log('something went wrong your deviceToken was not stored in phone')
    })
  });
  PushNotificationIOS.setApplicationIconBadgeNumber(0)
}

export function attachDeviceToken(){
  return AsyncStorage.getItem('deviceToken')
}
