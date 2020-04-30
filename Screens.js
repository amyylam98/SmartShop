import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import List from './List.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

/*const HomeScreen = () => {
	return(
		<View>
			<Text>Lists</Text>
			<Button title="Create New List" onPress={() => navigate('List')} />
		</View>
		)
};*/

class HomeScreen extends Component{
	render(){
		const { navigate } = this.props.navigation;
		return(
		<View>
			<Text>Lists</Text>
			<Button title="Create New List" onPress={() => navigate('List')} />
		</View>
		)
	}
	
};

const Stack = createStackNavigator();

export const Lists = () => {
  return (
	<ScreenContainer>
		<TouchableOpacity>
		<Text>Shopping Trip 1 </Text>
		</TouchableOpacity>
		<Text></Text>
		<Button title='New List'/>
	</ScreenContainer>
  );
};


export const TripSum = () => {
  return (
    <ScreenContainer>
      <Text>Trip Summaries</Text>
    </ScreenContainer>
  );
};

export const CostSum = () => {
  return (
    <ScreenContainer>
      <Text>Cost Summaries</Text>
    </ScreenContainer>
  );
};