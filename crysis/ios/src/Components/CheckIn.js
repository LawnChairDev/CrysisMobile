import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

class CheckIn extends Component {
	navigateSafe(routeName) {
		let that = this;
			// the user id will have to be changed to match the current user
		fetch('http://localhost:3000/api/user/?id=2&column=status', {
			method: 'put',
				headers: {
					'Accept': 'application/json',
				  'Content-Type': 'application/json',
				},
			body: JSON.stringify({
					status: 'true'
			})
		})
		console.log("I'm safe");
		this.props.navigator.push({
			name: routeName
		})
	}
	navigateHelp(routeName) {
		let that = this;
			// the user id will have to be changed to match the current user
		fetch('http://localhost:3000/api/user/?id=2&column=status', {
			method: 'put',
				headers: {
					'Accept': 'application/json',
				  'Content-Type': 'application/json',
				},
			body: JSON.stringify({
					status: 'false'
			})
		})
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