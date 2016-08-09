import React, { Component } from 'react';
import {
	View,
	Text,
  StyleSheet,
	TouchableHighlight,
  ScrollView,
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
		// sendLoginCredentials({
		// 	username: this.state.usernameTextbox,
		// 	password: this.state.passwordTextbox
		// }).then(function(response){
		// this.navigate('Home');
		// })
		// .catch(function(err){
		// 	console.log(err)
		// })
		this.navigate('Home');
	}

	render() {
		return (
			<View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            scrollEnabled={false}
            keyboardShouldPersistTaps={false}
          >
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
              onSubmitEditing={this.navigate.bind(this, 'Home')}
              value={this.state.passwordTextbox}
            />
      		<TouchableHighlight
      			onPress={ this.onSubmitLoginCredentials.bind(this) }
      			style={styles.button}>
        			<Text style={styles.buttonText}>Login</Text>
      		</TouchableHighlight>
          </ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFDBF3'
  },
  button: {
    height: 50,
    backgroundColor: '#CE0536',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 50,
    alignSelf: 'center',
    marginBottom: 15
  },
  scrollView: {
    flex: 1,
    padding: 30,
    marginTop: 180,
    alignSelf: 'stretch'
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
