import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Image,
	TouchableHighlight,
	TouchableWithoutFeedback
} from 'react-native';

import { sendEmergencyAlert } from '../helpers/helperAPI';
import red from '../assets/red.png';
import catButton from '../assets/cautionbutton.png';

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			animatedValue: new Animated.Value(0),
			timeLeft: 4,
			buttonPushed: false,
			emergencySent: false
		}
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

	handlePressIn(){
		var self = this;
		this.setState({buttonPushed: true});
		var combinedDuration = (1 - this.state.animatedValue._value / 100) * 4000;
		var number = Math.ceil(combinedDuration/1000);
		this.setState({ timeLeft: number});
		this.id1 = setInterval(function(){
			console.log(number);
			if(number > 1){
				number--;
				self.setState({ timeLeft: number});
			} else {
				self.setState({emergencySent: true});
				self.onEmergencyAlert();
			}
		}, 1000);
		Animated.timing(this.state.animatedValue, {
			toValue: 100,
			duration: combinedDuration
		}).start();
	}

	handlePressOut(){
		var self = this;
		this.setState({buttonPushed: false});
		clearInterval(this.id1)
		if(this.state.animatedValue._value != 100){
			Animated.timing(this.state.animatedValue, {
				toValue: 0,
				duration: 1000
			}).start()
		}
	}

	showText(){
		if(this.state.buttonPushed){
			if(this.state.emergencySent){
				return (
					<View style={styles.countdownFrame}>
						<Text style={styles.emergencyText}>
							EMERGENCY ALARM TRIGGERED
						</Text>
					</View>
				)
			} else {
				return (
					<View style={styles.countdownFrame}>
					<Text>Hold for  <Text style={styles.boldLarge}>
					{this.state.timeLeft}
					</Text>  more seconds</Text>
					</View>
				)
			}
		} else {
			return null
		}
}

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

	render() {

		var cautionButton;
		var cautionShadow;

		var interpolatedColor = this.state.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(110, 180, 120, 1)', 'rgba(120,160,120,0)']
    })

		if(this.state.buttonPushed){
			cautionButton = [styles.cButton, {bottom: 49, left: 3}];
			cautionShadow = [styles.cButtonShadow, {backgroundColor: 'gray'}]
		} else {
			cautionButton = styles.cButton;
			cautionShadow = styles.cButtonShadow;
		}

		return (
			<View style={styles.container}>
        <Image source={red} style={styles.bgRed}>
        <Animated.View style={[styles.bgOverlay, {backgroundColor: interpolatedColor}]}>
        <View style={cautionShadow}></View>
        <TouchableWithoutFeedback
        onPressIn={this.handlePressIn.bind(this)}
        onPressOut={this.handlePressOut.bind(this)}>
        <View style={cautionButton}>
        <Image source={catButton} style={styles.caution}>
        <Text style={styles.buttonText}>ACTIVATE{"\n"}ALERT</Text>
        </Image>
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.countdown}>
          {this.showText()}
        </View>
        </Animated.View>
        </Image>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgRed: {
    flex: 1,
    width: null,
    height: null
  },
  bgOverlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontFamily: 'courier',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  boldLarge: {
    fontWeight: 'bold',
    fontSize: 20
  },
  cButton: {
    width: 230,
    height: 170,
    borderRadius: 25,
    bottom: 55,
  },
  cButtonShadow: {
    width: 230,
    height: 170,
    borderRadius: 25,
    backgroundColor: 'darkgray',
    top: 125,
    left: 6
  },
  caution: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countdown: {
    bottom: 330,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countdownFrame: {
    flex: 1,
    backgroundColor: 'darkgray',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  emergencyText: {
    fontWeight: 'bold',
    color: 'darkred',
    fontSize: 18
  }
});


// const styles = StyleSheet.create({
// 	container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: null,
//     height: null
//   },
// 	button: {
// 		height: 160,
// 		width: 300,
// 		backgroundColor: "#6C1111",
//     shadowColor: "#000000",
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 2,
//       width: 0
//     }
// 	},
//   buttonText: {
//   	justifyContent: 'center',
//   	fontSize: 80,
// 		textAlign: 'center',
//   	fontFamily: 'courier',
// 		borderRadius: 10,
//   	paddingTop: 40,
//   	paddingBottom: 40,
// 		backgroundColor: '#CE0536',
// 		shadowColor: "#000000",
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 2,
//       width: 0
//     }
//   },
//   counter: {
//   	color: 'white',
//   	backgroundColor: 'transparent',
//   	alignSelf: 'center',
//   	fontSize: 20,
//   	marginTop: 30,
//   	fontFamily: 'courier'
//   }
// });

export default Home;
