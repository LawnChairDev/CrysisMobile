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
  return AsyncStorage.setItem(itemName, item, ( stuff ) => {
    console.log('AsynceStorage setItem was called');
    console.log(item, 'item in asyncStorage')
    console.log(stuff, 'this is stuff')
  })
}
