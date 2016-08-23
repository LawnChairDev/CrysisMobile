import { AsyncStorage } from 'react-native';
import rootUrl from './url';

var jwt;

export function checkIfAuthenticated(){
  return AsyncStorage.getItem('jwtToken')
  .then(function(data){
    if(data){
      jwt = data;
      }
      return new Promise(function(success, fail){
        success(jwt);
      })
    })
  .catch(function(){
    return new Promise(function(success, fail){
      fail('unable to retreive jwt from storage');
    })
  })
}

export function sendEmergencyAlert(){
  var url = buildUrl(rootUrl, '/api/alert')
  var config = {
    method: "PUT",
    headers: {
      "x-access-token": jwt,
    },
  }
  return fetch(url, config);
}

export function sendUserStatus(userStatus){
  var url = buildUrl(rootUrl, '/api/statusUpdate')
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
  return fetch(url, config);
}

export function getStatusList(){
  var url = buildUrl(rootUrl, '/api/statusUpdate');
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

export function getEmergencyStatus(){
  var url = buildUrl(rootUrl, '/api/alert');
  var config = {
    method: "GET",
    headers: {
      "x-access-token": jwt
    }
  }
  return fetch(url, config);
}

export function sendLoginCredentials(loginObj){
  return AsyncStorage.getItem('deviceToken')
  .then(function(dvcToken){
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
    if(data.token){
      jwt = data.token;
      return AsyncStorage.setItem('jwtToken', data.token)
    } else {
      return new Promise(function(success, fail){
        fail("incorrect login");
      })
    }
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
