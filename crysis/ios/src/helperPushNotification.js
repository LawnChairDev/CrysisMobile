import {
  PushNotificationIOS,
  AsyncStorage
 } from 'react-native'

export function registerPush(){
  PushNotificationIOS.requestPermissions();
  PushNotificationIOS.addEventListener('register', function(token){
    console.log('You are registered and your deviceToken is ', token);
    AsyncStorage.setItem('deviceToken', token, () => {
      console.log("AsyncStorage run");
    });
  });
}

export function attachDeviceToken(loginObj){
  AsyncStorage.getItem('deviceToken', (err, result) => {
    console.log(result, "result", typeof result, "type of result");
    loginObj.deviceToken = result;
  })
}
