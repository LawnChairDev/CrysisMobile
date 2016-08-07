import { getFromStorage } from './helperLocalStorage';

var rootUrl = 'http://192.168.1.76:3000';

var jwt;

export function attachJwtToHeaders(){
  jwt = getFromStorage('jwtToken');
}

export function submitEmergencyAlert(){
  console.log('running emergencyAlertCall');
  // ====  NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/emergencyAlert')
  var config = {
    method: "POST",
    headers: {
      "x-access-token": jwt
    }
  }
  console.log(url, "url", config, "config");
  //return fetch(url, config);
}

export function submitUserStatus(){
  console.log('running userStatusCall');
  // === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/userStatus')
  var config = {
    method: "POST",
    headers: {
      "x-access-token": jwt
    }
  }
  // return fetch(url, config);
}

export function getStatusList(){
  console.log('running getStatusList');
  // === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/statusList');
  var config = {
    method: "GET",
    headers: {
      "x-access-token": jwt
    }
  }
  // return fetch(url, config);
}

export function submitLoginCredentials(loginObj){
  console.log('running submitLoginCredentials');
  //  === NEED TO SETUP ROUTE === //
  var url = buildUrl(rootUrl, '/api/login');
  var config = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: loginObj
  }
  // return fetch(url, config);
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
