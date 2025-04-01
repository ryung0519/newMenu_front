import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import BottomNav from './BottomNav';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CalenderScreen from '../screens/CalenderScreen';

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    BottomNav: undefined;
    Product: undefined;

    // 캘린더 수정중
    Calender: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
    return (
        <NavigationContainer>
            {/* 캘린더 수정중 */}
            {/* <Stack.Navigator id={undefined} initialRouteName="Calender" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Calender" component={CalenderScreen} /> */}

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
