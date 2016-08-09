import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

const EmployeeEntry = (props) => {
	var entryStyle;
		if (props.status === 'true') {
			entryStyle = styles.entrySafe
		} else {
			entryStyle = styles.entryHelp
		}
	return (
		<View style={entryStyle}>
			<Text style={styles.text}>Name: { props.name }</Text>
			<Text style={styles.text}>Warden: { props.wardenName }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	entryDefault: {
		margin: 5,
		padding: 6,
		borderRadius: 7,
		backgroundColor: 'gray'
	},
	entrySafe: {
		margin: 5,
		padding: 6,
		borderRadius: 7,
		backgroundColor: '#3ED715'
	},
	entryHelp: {
		margin: 5,
		padding: 6,
		borderRadius: 7,
		backgroundColor: '#FE3C3C'
	},
	text: {
		color: '#fff',
		fontSize: 17,
		fontWeight: 'bold',
		padding: 6
	}
})

export default EmployeeEntry;