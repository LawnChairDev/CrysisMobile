import React, { Component } from 'react';
import {
	Text,
  Image,
  StyleSheet
} from 'react-native';

import { getFromStorage } from '../helpers/helperLocalStorage'
import red from '../red.png';

class Loading extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (getFromStorage('deviceToken')) {
			this.props.navigator.push({
				name: 'Home'
			})
		} else {
			this.props.navigator.push({
				name: 'Login'
			})
		}
	}

	render() {
		if (getFromStorage('deviceToken')) {}
		return (
			<Image style={styles.container} source={red}>
				<Text style={styles.text}>Loading Crysis...</Text>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: null,
		height: null
	},
	text: {
		flex: 1,
		marginLeft: 40,
		alignSelf: 'center',
		fontFamily: 'courier',
		fontSize: 30,
	}
})

export default Loading;