import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  PushNotificationIOS,
  Text,
  View
} from 'react-native';

import Home from './ios/src/Components/Home';
import Login from './ios/src/Components/Login';

class crysis extends Component {

  handleRender(route, navigator) {
    if (route.name === 'Login') {
      return <Login navigator={navigator} />
    }
    if (route.name === 'Home') {
      return <Home navigator={navigator} />
    }
    if (route.name === 'CheckIn') {
      return <CheckIn navigator={navigator} />
    }
    if (route.name === 'Attendance') {
      return <Attendance navigator={navigator} />
    }
    if (route.name === 'Help') {
      return <Help navigator={navigator} />
    }
  }

  render() {
    Navigator.SceneConfigs.HorizontalSwipeJump.gestures = {}
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', function(token){
  console.log('You are registered and the device token is: ', token);
    });

    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'Login'}}
          renderScene={this.handleRender.bind(this)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#BFDBF3',
  },
});

AppRegistry.registerComponent('crysis', () => crysis);
