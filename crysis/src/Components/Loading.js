import React, { Component } from 'react';
import {
	Text,
  Image,
  StyleSheet,
	View
} from 'react-native';

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
				if(jwt){
					console.log("inside componentDidMount after checking for jwt in loading");
					self.props.changeAuthState();
					getEmergencyStatus()
						.then(function(response){
							console.log("inside then of getEmergencyStatus");
							return response.json();
						})
						.then(function(data){
							console.log("inside 2nd then of getEmergencyStatus");
							if(data.inEmergency === true){
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
							console.error('there was an error running emergencyStatus here it is: ', err);
						})
				} else {
					self.props.navigator.push({
						name: 'Login'
					})
				}
			})
			.catch(function(err){
				console.error(err);
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
