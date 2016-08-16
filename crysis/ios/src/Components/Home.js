import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import { sendEmergencyAlert } from '../helpers/helperAPI';
import green from '../green.png';

class Home extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(newProps) {
		// console.log(this.props);
		// console.log(newProps);
		if(this.props.inEmergency === false && newProps.inEmergency === true){
			console.log('we have determined that props inEmergency is true')
			this.props.navigator.push({
				name: 'CheckIn'
			})
		}
	}

	// componentWillUpdate(){
	// 	console.log('componentWillUpdate called inside of Home Component')
	// 	if(this.props.inEmergency){
	// 		console.log('inEmergency is equal to: ', this.props.inEmergency);
	// 		console.log('inEmergency is true about to push navigator into Check In');
	// 		this.props.navigator.push({
	// 			name: 'CheckIn'
	// 		})
	// 	}
	// }

	onEmergencyAlert() {
		var self = this;
		sendEmergencyAlert()
			.then(function(){
				self.props.navigator.push({
					name: 'CheckIn'
				})
			})
			.catch(function(err){
				console.log('call to send emergencyAlert did not work')
				console.log('here is the error', err)
			})
	}

	// navigate() {
	// 	this.props.navigator.push({
	// 		name: 'CheckIn'
	// 	})
	// 	sendEmergencyAlert();
	// }

	render() {
		return (
			<Image style={styles.container} source={green}>
			    <TouchableHighlight
			    	delayLongPress={4500}
			    	onLongPress={this.onEmergencyAlert.bind(this)}
			    	style={styles.button}
			    >
					<View>
	  					<Text style={styles.buttonText}>Crysis</Text>
					</View>
			</TouchableHighlight>
					<View>
  					<Text style={styles.counter}>Hold For 5 Seconds</Text>
  				</View>
  		</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null
  },
	button: {
		height: 160,
		width: 300,
		backgroundColor: "#6C1111",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
	},
  buttonText: {
  	justifyContent: 'center',
  	fontSize: 80,
		textAlign: 'center',
  	fontFamily: 'courier',
		borderRadius: 10,
  	paddingTop: 40,
  	paddingBottom: 40,
		backgroundColor: '#CE0536',
		shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  counter: {
  	color: 'white',
  	backgroundColor: 'transparent',
  	alignSelf: 'center',
  	fontSize: 20,
  	marginTop: 30,
  	fontFamily: 'courier'
  }
});

export default Home;
