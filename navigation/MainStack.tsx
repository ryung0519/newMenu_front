import React from "react";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import BottomNav from "./BottomNav";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottonNav" component={BottomNav} />
                <Stack.Screen name="Product" component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default MainStack;