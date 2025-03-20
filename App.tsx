// 리액트 관련 기본 모듈
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import BottomNav from './navigation/BottomNav';

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  BottomNav: undefined; // 

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        {/* 메인 화면으로 HomeScreen 보여주기 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // 상단 헤더를 숨김 처리
        />

        {/* 회원가입 화면으로 SignupScreen 컴포넌트를 보여주기 */}
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: '회원가입' }} // 상단 헤더 제목 설정
        />

        {/* 기존에 있던 BottomNav(하단 탭 네비게이션) 화면을 추가하고 싶으면 이렇게 추가해도 됨 */}
        {/* <Stack.Screen name="BottomNav" component={BottomNav} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
