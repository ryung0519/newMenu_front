import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import BottomNav from './BottomNav';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    BottomNav: undefined;
    Product: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
    return (
        <NavigationContainer>
            {/* 혜령 id={undefined} 추가 및 app.tsx의 내용 추가가*/}
            <Stack.Navigator   id={undefined} initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="BottomNav" component={BottomNav} />
                <Stack.Screen name="Product" component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;
