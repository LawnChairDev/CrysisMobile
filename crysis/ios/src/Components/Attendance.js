import React, { Component } from 'react';
import {
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	ScrollView
} from 'react-native';

// import { getStatusList } from '../helpers/helperAPI'
import EmployeeEntry from './EmployeeEntry';
import red from '../red.png';
import _ from 'lodash'

class Attendance extends Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	employeeStatusData: ''
		// }
	}

	componentWillMount() {
		this.props.checkAttendanceList();
	}

	componentDidMount() {
		// let self = this;
		// getStatusList().then(function(response) {
		// 	self.setState({employeeStatusData: JSON.parse(response._bodyInit)})
		// 	console.log('Data Recieved - ', JSON.parse(response._bodyInit));
		// }).catch(function(err) {
		// 	console.log('Error Recieving Data - ', err);
		// })
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
						isAdmin={user.isAdmin}
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
		backgroundColor: '#1396C2'
	},
	buttonText: {
		fontWeight: 'bold',
		padding: 5,
		color: '#fff'
	 }
});

export default Attendance;
