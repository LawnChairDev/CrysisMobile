import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

class Help extends Component {

	navigate() {
		this.props.navigator.pop()
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>Your Warden has been notified. Help is on the way...</Text>
				</View>

				<TouchableHighlight
					onPress={this.navigate.bind(this)}
				>
						<Text style={styles.text}>Back</Text>
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
		margin: 10
	},
	text: {
		fontSize: 20,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 20,
		alignSelf: 'center'
	},
	button: {
		height: 30,
		width: 60,
		margin: 25,
		backgroundColor: '#3ED715'
	},
	buttonText: {

	}
})

export default Help;