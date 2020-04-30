import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Lists, TripSum, CostSum } from './Screens';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './List.js';
import Trip from './Trip.js';
import Cost from './Cost.js';

const Tabs = createBottomTabNavigator();
const ListStack = createStackNavigator();
const TripStack = createStackNavigator();
const CostStack = createStackNavigator();

const ListStackScreen = () => (
  <ListStack.Navigator>
    <ListStack.Screen name = "All Lists" component = {List}/>
  </ListStack.Navigator>
);

const TripStackScreen = () => (
  <TripStack.Navigator>
    <TripStack.Screen name = "Trip Summaries" component = {Trip}/>
  </TripStack.Navigator>
);

const CostStackScreen = () => (
  <CostStack.Navigator>
    <CostStack.Screen name = "Cost Summaries" component = {Cost}/>
  </CostStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <Tabs.Navigator initialRouteName="Lists" tabBarOptions={{activeColor: '#3C505C', inactiveColor: '#4C97C2', barStyle: { backgroundColor: '#96CED8' }, shifting: true,}}>

      <Tabs.Screen 
          name = "Lists" 
          component = {ListStackScreen} 
          options={{
            tabBarLabel: 'Lists',
            tabBarIcon: ({ tintColor }) => (
              <Icon style={[{color: tintColor}]} size={25} name={'ios-list'}/>
            ),
            activeColor: '#3C505C',
            inactiveColor: '#4C97C2',
            barStyle: { backgroundColor: '#96CED8' },
          }}
      />

      <Tabs.Screen 
          name = "Trip Summaries" 
          component = {TripStackScreen}
          options={{
          tabBarLabel: 'Trip Summaries',
            tabBarIcon: ({ tintColor }) => (
              <Icon style={[{color: tintColor}]} size={25} name={'ios-basket'}/>
            ),
          activeColor: '#3D7C39',
          inactiveColor: '#48AB34',
          barStyle: { backgroundColor: '#7FD979' },
          }}
      />

      <Tabs.Screen 
          name = "Cost Summaries" 
          component = {CostStackScreen}
          options={{
            tabBarLabel: 'Cost Summaries',
              tabBarIcon: ({ tintColor }) => (
                <Icon style={[{color: tintColor}]} size={25} name={'ios-trending-up'}/>
              ),
            activeColor: '#AE2727',
            inactiveColor: '#CC5D5D',
            barStyle: { backgroundColor: '#E57F7F' },
          }}
      />

    </Tabs.Navigator>
  </NavigationContainer>
);
