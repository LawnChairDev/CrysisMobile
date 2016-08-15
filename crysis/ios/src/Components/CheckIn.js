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
		this.state = {
			needHelp: false
		}
	}

	navigateSafe() {
		var self = this;
		sendUserStatus('safe')
			.then(function(){
				console.log("pushed the I'm safe button");
				self.hideHelpMessage()
				self.props.navigator.push({
					name: 'Attendance'
				})
			})
			.catch(function(err){
				console.log("error inside of sendUserStatus", err);
			})
	}

	navigateHelp() {
		var self = this;
		sendUserStatus('inDanger')
			.then(function(){
				console.log("pushed the in danger button");
				self.helpMessage();
				// this.props.navigator.push({
				// 	name: 'Attendance'
				// })
			})
		}

	hideHelpMessage() {
		this.setState({needHelp: false}, function() {
			console.log('Help Message OFF - ', 'false')
		})
	}

	helpMessage() {
		this.setState({needHelp: true}, function() {
			styles.helpFeedback = {
				alignSelf: 'center',
				justifyContent: 'flex-end',
				backgroundColor: '#FE3C3C',
				borderRadius: 5,
				margin: 15,
				shadowColor: "#000000",
    		shadowOpacity: 0.8,
    		shadowRadius: 2,
    		shadowOffset: {
      		height: 2,
      		width: 0
    		}
			}
			styles.helpFeedbackText = {
				flex: 1,
  			padding: 5,
  			margin: 5,
  			color: '#fff',
  			justifyContent: 'center',
  			fontFamily: 'courier',
  			fontWeight: 'bold',
  			fontSize: 30,
			}
		})
	}

	render() {
		// let helpMessageStyle;
		// if (this.state.needHelp) {

		// }
		return (
			<Image style={styles.container} source={red}>
				<View style={styles.title}>
					<Text style={styles.titleText}>Check In</Text>
				</View>
				<View style={styles.buttons}>
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
				</View>
					<View style={styles.helpFeedback}>
        		<Text style={styles.helpFeedbackText}>Help Alert Sent</Text>
        	</View>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
    width: null,
    height: null
	},
	title: {

	},
	titleText: {
		fontFamily: 'courier',
		padding: 15,
		color: '#fff',
		fontSize: 60,
		fontWeight: 'bold'
	},
	buttons: {
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	helpFeedback: {

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
  },
  helpFeedbackText: {
  	color: 'transparent'
  }
})

export default CheckIn;
