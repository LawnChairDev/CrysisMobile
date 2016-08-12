import { AsyncStorage } from 'react-native';
import { attachDeviceToken } from './helperPushNotification';

// var rootUrl = 'http://192.168.1.56:3000';
var rootUrl = 'http://localhost:3000';

var jwt;
AsyncStorage.getItem('jwtToken')
  .then(function(data){
    jwt = data;
    console.log('your jwt was successfully loaded into memory');
  })
  .catch(function(){
    console.log('unable to retreive jwt from storage');
  })

export function sendEmergencyAlert(){
  console.log('running emergencyAlertCall');
  var url = buildUrl(rootUrl, '/api/alert')
  var config = {
    method: "PUT",
    headers: {
      "x-access-token": jwt,
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    },
    // body: JSON.stringify({
    //   emergencyStatus: 'true'
    // })
  }
  console.log(url, "url", config, "config");
  return fetch(url, config);
}

export function sendUserStatus(userStatus){
  console.log('running userStatusCall');
  // === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/user/?id=2&column=status')
  var config = {
    method: "PUT",
    headers: {
      "x-access-token": jwt,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        status: userStatus
    })
  }
  // return fetch(url, config);
}

export function getStatusList(){
  console.log('running getStatusList');
  // === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/user');
  var config = {
    method: "GET",
    headers: {
      "x-access-token": jwt
    }
  }
  return fetch(url, config);
}

export function sendDeviceToken(deviceToken){
  var url = buildUrl(rootUrl, '/api/deviceToken');
  var config = {
    method: "PUT",
    headers: {
      "x-access-token": jwt,
      "Accept": "application/json",
      "Conten-Type": "application/json"
    },
    body: JSON.stringify({
      deviceToken: deviceToken
    })
  }
  return fetch(url, config);
}

export function sendLoginCredentials(loginObj){
  console.log('running submitLoginCredentials');
  var copiedObj = Object.assign({}, loginObj);
  console.log(copiedObj);
  return AsyncStorage.getItem('deviceToken')
  .then(function(dvcToken){
    console.log(dvcToken, "device token retreived from storage");
    loginObj.deviceToken = dvcToken;
    var url = buildUrl(rootUrl, '/api/mobileLogin');
    var config = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(loginObj)
    }

    return fetch(url, config)
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log('attached jwt to api calls')
    console.log(data, 'data returned from server on login')
    jwt = data.token;
    return AsyncStorage.setItem('jwtToken', data.token)
  })
}


function buildUrl(url, route, obj){
  if(obj){
    var ParamsArray = Object.keys(obj).map(function(key){
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    });
    return url + route + "?" + ParamsArray.join("&");
  } else {
    return url + route;
  }
};
