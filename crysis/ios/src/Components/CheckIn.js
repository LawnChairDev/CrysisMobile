import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

class CheckIn extends Component {
	navigateAllClear(routeName) {
		console.log("I'm safe");
		this.props.navigator.push({
			name: routeName
		})
	}
	navigateDanger(routeName) {
		console.log("HELP!");
		this.props.navigator.push({
			name: routeName
		})
	}

	render() {
		return (
			<View style={styles.container}>

				<TouchableHighlight
					onPress={this.navigateAllClear.bind(this, 'Attendance')}
					style={styles.allClear}>
					<Text
						style={styles.text}>SAFE</Text>
				</TouchableHighlight>

				<TouchableHighlight
					onPress={this.navigateDanger.bind(this, 'Help')}
					style={styles.danger}>
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
	danger: {
		width: 100,
		height: 100,
		marginLeft: 20,
		borderRadius: 10,
		backgroundColor: '#FE3C3C',
  },
  allClear: {
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