import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import { sendUserStatus } from '../helpers/helperAPI';
import red from '../red.png';

class CheckIn extends Component {
	constructor(props) {
		super(props)
	}

	navigateSafe() {
		var self = this;
		sendUserStatus('safe')
			.then(function(){
				console.log("pushed the I'm safe button");
				self.props.navigator.push({
					name: 'Attendance'
				})
			})
			.catch(function(err){
				console.log("error inside of sendUserStatus", err);
			})
	}

	navigateHelp() {
		sendUserStatus('inDanger')
			.then(function(){
				console.log("pushed the in danger button");
				// this.props.navigator.push({
				// 	name: 'Attendance'
				// })
			})
	}

	render() {
		return (
			<Image style={styles.container} source={red}>

				<TouchableHighlight
					onPress={this.navigateSafe.bind(this)}
					style={styles.safe}>
					<Text style={styles.text}>SAFE</Text>
				</TouchableHighlight>

				<TouchableHighlight
					onPress={this.navigateHelp.bind(this)}
					style={styles.help}>
					<Text style={styles.text}>HELP</Text>
				</TouchableHighlight>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		flexDirection: 'row',
    width: null,
    height: null
	},
	help: {
		width: 100,
		height: 100,
		marginLeft: 20,
		backgroundColor: '#FE3C3C',
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  safe: {
  	width: 100,
		height: 100,
		marginRight: 20,
	  backgroundColor: '#3ED715',
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'courier',
    fontWeight: 'bold',
		alignSelf: 'center',
		paddingTop: 35,
  }
})

export default CheckIn;
