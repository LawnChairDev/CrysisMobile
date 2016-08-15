import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

const EmployeeEntry = (props) => {
	var entryStyle;
		if (props.status === 'safe') {
			entryStyle = styles.entrySafe;
		} else if (props.status === 'inDanger') {
			entryStyle = styles.entryHelp;
		} else {
			entryStyle = styles.entryDefault;
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
		backgroundColor: 'gray',
		shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
	},
	entrySafe: {
		margin: 5,
		padding: 6,
		borderRadius: 7,
		backgroundColor: '#3ED715',
		shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
	},
	entryHelp: {
		margin: 5,
		padding: 6,
		borderRadius: 7,
		backgroundColor: '#FE3C3C',
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
		fontSize: 17,
		fontWeight: 'bold',
		padding: 6
	}
})

export default EmployeeEntry;
