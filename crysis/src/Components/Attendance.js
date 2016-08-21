import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	ScrollView
} from 'react-native';

import EmployeeEntry from './EmployeeEntry';
import red from '../assets/red.png';
import _ from 'lodash'

class Attendance extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.checkAttendanceList();
	}

	mapData() {
		return _.map(this.props.empData, function(user, i) {
		 	return (
	 			<EmployeeEntry
					id={user.id}
					key={i}
					name={user.name}
					status={user.status}
					wardenName={user.wardenName}
				/>
			)
		})
	}

	render() {
		return (
			<Image style={styles.container} source={red}>
					<Text style={styles.title}>Attendance</Text>
				<ScrollView style={styles.scrollBox}>
					{ this.mapData() }
				</ScrollView>
				<TouchableHighlight style={styles.button} onPress={() => this.props.navigator.pop()}>
					<View>
						<Text style={styles.buttonText}>BACK</Text>
					</View>
				</TouchableHighlight>
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: null,
		width: null,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	title: {
		alignSelf: 'center',
		fontFamily: 'courier',
		color: '#fff',
		fontSize: 30,
		margin: 20
	},
	scrollBox: {
		alignSelf: 'center'
	},
	button: {
		height: 30,
		width: 60,
		alignSelf: 'center',
		backgroundColor: 'gray',
		margin: 20,
		borderRadius: 7,
		shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
	},
	buttonText: {
		fontWeight: 'bold',
		alignSelf: 'center',
		padding: 5,
		color: '#fff'
	 }
});

export default Attendance;
