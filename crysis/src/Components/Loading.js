import React, { Component } from 'react';
import {
	Text,
  Image,
  StyleSheet,
	View
} from 'react-native';

import { getFromStorage } from '../helpers/helperLocalStorage';
import { checkIfAuthenticated, getEmergencyStatus } from '../helpers/helperAPI'
import red from '../assets/red.png';

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
		if(this.props.inEmergency){
			return (
				<Image style={styles.container} source={red}></Image>
			)
		} else {
			return (
				<View style={[styles.container, {backgroundColor: 'rgba(110, 180, 120, 1)'}]}></View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null
	}
})

export default Loading;
