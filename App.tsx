// 리액트 관련 기본 모듈
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import BottomNav from './navigation/BottomNav';
import LoginScreen from './screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  BottomNav: undefined; // 

};

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
                {/* 🔐 앱 시작 시 가장 먼저 보여줄 로그인 화면 */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // ✅ 상단 헤더(←Home 같은 것) 안 보이게
        />

        {/* 📝 회원가입 화면 */}
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: '회원가입' }} // ✅ 회원가입만 상단 제목 보여줘도 됨!
        />

        {/* 🧭 하단 탭 네비게이션 (BottomNav = Main, 캘린더, 마이페이지 포함) */}
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{ headerShown: false }} // ✅ 가장 중요: 상단에 "BottomNav" 안 보이게!
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;