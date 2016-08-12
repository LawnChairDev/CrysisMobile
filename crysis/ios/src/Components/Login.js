import React, { Component } from 'react';
import {
	View,
	Text,
  StyleSheet,
	TouchableHighlight,
  TextInput
} from 'react-native';
import { sendLoginCredentials } from '../helpers/helperAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTextbox: '',
      passwordTextbox: ''
    }
  }
	navigate(routeName) {
		this.props.navigator.push({
			name: routeName
		});
	}

	onSubmitLoginCredentials(){
		console.log('inside this function');
		var self = this;
		sendLoginCredentials({
			username: this.state.usernameTextbox,
			password: this.state.passwordTextbox
		})
		.then(function(){
    	console.log('finished');
			self.navigate('Home');
    })
		.catch(function(error){
			console.log(error);
		})
	}

	render() {
		return (
			<View style={styles.container}>
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
            //onSubmitEditing={this.navigate.bind(this, 'Home')}
            value={this.state.passwordTextbox}
          />
      		<TouchableHighlight
      			onPress={ this.onSubmitLoginCredentials.bind(this) }
      			style={styles.button}>
        			<Text style={styles.buttonText}>Login</Text>
      		</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFDBF3',
    padding: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#CE0536',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 50,
    marginBottom: 15
  },
  textBoxes: {
    height: 40,
    margin: 5,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default Login;
