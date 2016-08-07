import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import _ from 'lodash'

import EmployeeEntry from './EmployeeEntry';

class Attendance extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: ''
		}
	}

	componentDidMount() {
		let that = this;
		fetch('http://localhost:3000/api/user', {
			method: 'get'
		}).then(function(response) {
			that.setState({userData: JSON.parse(response._bodyInit)})
			console.log('Data Recieved - ', JSON.parse(response._bodyInit));
		}).catch(function(err) {
			console.log('Error Recieving Data - ', err);
		})
	}

	mapData() {
		return _.map(this.state.userData, function(user, i) {
			 return (
		 			<EmployeeEntry
						id={user.id}
						key={i}
						name={user.name}
						status={user.status}
						wardenName={user.wardenName}
						isAdmin={user.isAdmin}
					/>
				)
		})
	}

	render() {
		return (
			<View style={styles.container}>
					<Text style={styles.title}>Attendance</Text>
				<ScrollView style={styles.scrollBox}>
					{ this.mapData() }
				</ScrollView>
					<TouchableHighlight
						style={styles.button}
						onPress={() => this.props.navigator.pop()}>
							<Text style={styles.buttonText}>BACK</Text>
					</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#BFDBF3',
		justifyContent: 'space-between'
	},
	title: {
		alignSelf: 'center',
		fontSize: 30,
		margin: 20
	},
	scrollBox: {
		margin: 20,
		marginTop: 0
	},
	button: {
		height: 30,
		width: 60,
		margin: 25,
		backgroundColor: '#3ED715'
	},
	buttonText: {
		fontSize: 15,
		padding: 10,
		borderRadius: 8
	 }
});

export default Attendance;