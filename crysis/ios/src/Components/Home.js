import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import { submitEmergencyAlert } from '../helpers/helperAPI';

class Home extends Component {

	navigate(routeName) {
		this.props.navigator.push({
			name: routeName
		})
		sendEmergencyAlert();
	}

	render() {

		return (
			<View>
		    <TouchableHighlight
		    	delayLongPress={4500}
		    	onLongPress={this.navigate.bind(this, 'CheckIn')}
		    	style={styles.button}
		    >
				<View>
  					<Text style={styles.buttonText}>Crysis</Text>
				</View>
			</TouchableHighlight>
					<View>
  					<Text style={styles.counter}>Hold For 5 Seconds</Text>
  				</View>
  		</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		marginTop: 250,
		justifyContent: 'center',
		alignSelf: 'center',
		height: 150,
		width: 300,
		borderRadius: 3,
		backgroundColor: '#F5FCFF',
	},
  buttonText: {
  	fontSize: 85,
  	paddingTop: 25,
  	paddingBottom: 25,
		borderRadius: 3,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#CE0536'
  },
  counter: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 30,
  	marginTop: 30,
  	fontWeight: 'bold'
  }
});

export default Home;
