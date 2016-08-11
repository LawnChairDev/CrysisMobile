import React, { Component } from 'react';
import {
	View,
	Text,
  StyleSheet,
	TouchableHighlight,
  ScrollView,
  Image,
  TextInput
} from 'react-native';

import { sendLoginCredentials } from '../helpers/helperAPI';
import wallpaper from '../wallpaper.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTextbox: '',
      passwordTextbox: ''
    }
  }

	navigate() {
		this.props.navigator.push({
			name: 'Home'
		});
	}

	onSubmitLoginCredentials() {
		// sendLoginCredentials({
		// 	username: this.state.usernameTextbox,
		// 	password: this.state.passwordTextbox
		// }).then(function(response){
		// this.navigate('Home');
		// })
		// .catch(function(err){
    //  console.log(err)
    // })
    this.navigate('Home');
  }

  render() {
    return (
      <Image style={styles.container} source={wallpaper}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          scrollEnabled={false}
        >
          <View style={styles.modal}>
            <Text style={styles.title}>Crysis</Text>
            <TextInput
              style={styles.textBoxes}
              onChangeText={(usernameTextbox) => this.setState({usernameTextbox})}
              returnKeyType={'next'}
              placeholder={'Username'}
              value={this.state.usernameTextbox}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(passwordTextbox) => this.setState({passwordTextbox})}
              placeholder={'Password'}
              secureTextEntry={true}
              onSubmitEditing={this.navigate}
              value={this.state.passwordTextbox}
            />
            <TouchableHighlight
              onPress={ this.onSubmitLoginCredentials.bind(this) }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFDBF3',
    width: null,
    height: null
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 5,
    backgroundColor: '#6C1111',
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'courier',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 50,
    fontFamily: 'courier',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 30
  },
  modal: {
    marginTop: 200,
    backgroundColor: "#FDFDF1",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  textBoxes: {
    height: 40,
    margin: 5,
    padding: 10,
    borderColor: 'gray',
    fontFamily: 'courier',
    borderWidth: 2,
    borderColor: '#6C1111'
  }
});

export default Login;
