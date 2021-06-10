/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './Screens/HomeScreen';
import SearchModal from './Screens/SearchModal';
import MarketScreen from './Screens/MarketsScreen';
import NewsScreen from './Screens/NewsScreen';
import Stock from './Screens/StockScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: styles.container,
    showLabel: false,
}
  return (
    <Tab.Navigator
      style={styles.container}
      tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchModal}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="earth" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator >
        <RootStack.Screen
          name="Main"
          component={BottomNav}
          options={{headerShown: false}}
        />

        <RootStack.Screen name="Stock" component={Stock}  />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 25,
  }
})
export default App;
