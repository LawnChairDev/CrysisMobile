import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import { sendUserStatus } from '../helpers/helperAPI';

class CheckIn extends Component {
	navigateSafe(routeName) {
			// the user id will have to be changed to match the current user
		sendUserStatus('true');
		console.log("I'm safe");
		this.props.navigator.push({
			name: routeName
		})
	}
	navigateHelp(routeName) {
		sendUserStatus('false');
			// the user id will have to be changed to match the current user
		console.log("HELP!");
		this.props.navigator.push({
			name: routeName
		})
	}

	render() {
		return (
			<View style={styles.container}>

				<TouchableHighlight
					onPress={this.navigateSafe.bind(this, 'Attendance')}
					style={styles.safe}>
					<Text
						style={styles.text}>SAFE</Text>
				</TouchableHighlight>

				<TouchableHighlight
					onPress={this.navigateHelp.bind(this, 'Attendance')}
					style={styles.help}>
						<Text style={styles.text}>HELP</Text>
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
		flexDirection: 'row'
	},
	help: {
		width: 100,
		height: 100,
		marginLeft: 20,
		borderRadius: 10,
		backgroundColor: '#FE3C3C',
  },
  safe: {
  	width: 100,
		height: 100,
		marginRight: 20,
		borderRadius: 10,
	  backgroundColor: '#3ED715'
  },
  text: {
		flex: 1,
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 30
  }
})

export default CheckIn;
