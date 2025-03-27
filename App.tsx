// 리액트 관련 기본 모듈
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import BottomNav from './navigation/BottomNav';
import LoginScreen from './screens/LoginScreen';
import MainStack from './navigation/MainStack';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  BottomNav: undefined; // 

};

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => App);

export default App;
