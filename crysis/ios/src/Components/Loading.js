import React, { Component } from 'react';
import {
	Text,
  Image,
  StyleSheet
} from 'react-native';

import { getFromStorage } from '../helpers/helperLocalStorage'
import { checkIfAuthenticated, getEmergencyStatus } from '../helpers/helperAPI'

import red from '../red.png';

class Loading extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var self = this;
		checkIfAuthenticated()
			.then(function(jwt){
				console.log('this is the jwt grabbed from storage', jwt)
				if(jwt){
					console.log('found token for authentication');
					self.props.changeAuthState();
					getEmergencyStatus()
						.then(function(response){
							console.log(response);
							return response.json();
						})
						.then(function(data){
							console.log("data inside of json'd getEmergencyStatus", data);
							if(data.emergencyStatus === true){
								console.log("emergencyStatus is true so we are going in here");
								self.props.changeEmergencyState();
								self.props.navigator.push({
									name: 'CheckIn'
								})
							} else {
								self.props.navigator.push({
									name: 'Home'
								})
							}
						})
						.catch(function(err){
							console.log('there was an error trying to get emergencyStatus here it is: ', err);
						})
				} else {
					self.props.navigator.push({
						name: 'Login'
					})
				}
			})
			.catch(function(err){
				console.log(err);
			})
	}

	render() {
		return (
			<Image style={styles.container} source={red}>
				<Text style={styles.text}>Loading Crysis...</Text>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: null,
		height: null
	},
	text: {
		flex: 1,
		marginLeft: 40,
		alignSelf: 'center',
		fontFamily: 'courier',
		fontSize: 30,
	}
})

export default Loading;
