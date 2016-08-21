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
import red from '../assets/red.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTextbox: '',
      passwordTextbox: '',
      errorMessage: ''
    }
  }

onSubmitLoginCredentials(){
	var self = this;
	sendLoginCredentials({
		username: this.state.usernameTextbox,
		password: this.state.passwordTextbox
	})
	.then(function(){
		console.log('Credentials Approved');
		self.props.changeAuthState();
		self.props.navigator.push({
			name: 'Home'
		})
	})
	.catch(function(error){
    self.setState({errorMessage: 'Incorrect Login'})
    console.log('Error Approving Credentials - ', error);
	})
}

  render() {
    return (
			<View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          scrollEnabled={false}
        >
          <View style={styles.modal}>
            <Text style={styles.title}>Crysis</Text>
            <Text style={styles.errorMessage}>{ this.state.errorMessage }</Text>
            <TextInput
              style={styles.textBoxes}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(usernameTextbox) => this.setState({usernameTextbox})}
              returnKeyType={'next'}
              placeholder={'Username'}
              value={this.state.usernameTextbox}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(passwordTextbox) => this.setState({passwordTextbox})}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'Password'}
              secureTextEntry={true}
              //onSubmitEditing={this.navigate}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: null,
    height: null,
		backgroundColor: 'rgba(110, 180, 120, 1)'
  },
  button: {
    justifyContent: 'center',
    height: 40,
    margin: 5,
    backgroundColor: '#555555',
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'courier',
  },
  title: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 50,
    fontFamily: 'courier',
  },
  errorMessage: {
    color: '#6C1111',
    fontFamily: 'courier',
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    padding: 30
  },
  modal: {
    justifyContent: 'center',
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
    fontFamily: 'courier',
    borderWidth: 2,
    borderColor: '#555555'
  }
});

export default Login;
