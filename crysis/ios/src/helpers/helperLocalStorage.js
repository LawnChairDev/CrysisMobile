import { AsyncStorage } from 'react-native'

export function getFromStorage(itemName){
  var retreivedItem;
  AsyncStorage.getItem('itemName', (err, result) => {
    console.log("AsyncStorage getItem was called");
    retreivedItem = result;
    return result;
  })
}

export function setToStorage(itemName, item){
  AsyncStorage.setItem(itemName, item, ( ) => {
    console.log('AsynceStorage setItem was called');
  })
}
