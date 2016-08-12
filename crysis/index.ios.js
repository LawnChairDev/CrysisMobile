import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  PushNotificationIOS,
  AlertIOS,
  Text,
  View
} from 'react-native';

import { registerPush } from './ios/src/helpers/helperPushNotification';
import { getFromStorage } from './ios/src/helpers/helperLocalStorage';

import Home from './ios/src/Components/Home';
import CheckIn from './ios/src/Components/CheckIn';
import Attendance from './ios/src/Components/Attendance';
import Login from './ios/src/Components/Login';

class crysis extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: true
    }
  }

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
  }

  componentWillMount() {
    registerPush()
    PushNotificationIOS.addEventListener('notification', this.onNotification.bind(this));
    console.log('this comp started up')
  }

  render() {
    Navigator.SceneConfigs.HorizontalSwipeJump.gestures = {}

    if (getFromStorage('deviceToken')) {
      return (
        <View style={styles.container}>
          <Navigator
            initialRoute={{name: 'Home'}}
            renderScene={this.handleRender.bind(this)}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Navigator
            initialRoute={{name: 'Login'}}
            renderScene={this.handleRender.bind(this)}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
          />
        </View>
      )
    }
  }

  onNotification(notification) {
    if(notification.getData().silent){
      //FILL IN WITH UPDATE TO VIEW ON EMPLOYEE LIST
      return;
    }
    AlertIOS.alert(
      "Push Notification Received",
      "Alert message: " + notification.getMessage(),
      [{
        text: "Dismiss",
        onPress: null
      }]
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('crysis', () => crysis);
