import { getFromStorage } from './helperLocalStorage';

//var rootUrl = 'http://192.168.1.76:3000';
var rootUrl = 'http://localhost:3000';

var jwt;

export function attachJwtToHeaders(){
  jwt = getFromStorage('jwtToken');
}

export function sendEmergencyAlert(){
  console.log('running emergencyAlertCall');
  var url = buildUrl(rootUrl, '/api/user', {
    'column': 'OrganizationId',
    'value': '1' //THIS NEEDS TO BE CHANGED TO THE JWT
  })
  var config = {
    method: "PUT",
    headers: {
      "x-access-token": jwt,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emergencyStatus: 'true'
    })
  }
  console.log(url, "url", config, "config");
  //return fetch(url, config);
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

export function sendLoginCredentials(loginObj){
  console.log('running submitLoginCredentials');
  //  === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/login');
  var config = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(loginObj)
  }
  return fetch(url, config);
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
