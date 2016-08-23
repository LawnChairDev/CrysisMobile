import {
  PushNotificationIOS,
  AsyncStorage
 } from 'react-native'

export function registerPush(){
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', function(token){
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
