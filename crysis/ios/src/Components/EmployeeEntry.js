import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

const EmployeeEntry = (props) => {
	return (
		<View style={styles.entry}>
			<Text style={styles.text}>Name: { props.name }</Text>
			<Text style={styles.text}>Warden: { props.wardenName }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	entry: {
		margin: 5,
		padding: 12,
		borderWidth: 1,
		borderRadius: 7,
		backgroundColor: 'gray'
	},
	text: {
		color: '#BFDBF3',
		fontWeight: 'bold'
	}
})

export default EmployeeEntry;