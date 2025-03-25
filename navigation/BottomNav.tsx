import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalenderScreen from '../screens/CalenderScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="캘린더" component={CalenderScreen} options={{ tabBarIcon: ({ color }) => <Icon name="calendar" size={24} color={color} /> }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} /> }} />
        <Tab.Screen name="MY_page" component={MyPageScreen} options={{ tabBarIcon: ({ color }) => <Icon name="account" size={24} color={color} /> }} />
      </Tab.Navigator>
  );
};

export default BottomNav;
