import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../screens/MainScreen';
import CalenderScreen from '../screens/CalenderScreen';
import MyPageScreen from '../screens/MyPageScreen';

// ✅ 탭 네비게이터 생성 (제네릭 타입 생략: 오류 방지용)
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      id="BottomTab" // ✅ 타입스크립트 오류 방지용 id
      initialRouteName="Main" // ✅ 앱 처음 실행 시 열릴 탭 이름
      screenOptions={{ headerShown: false }} // ✅ 각 탭 상단의 헤더(제목줄)
    >



      {/* 🏠 메인 탭 */}
      <Tab.Screen
        name="Main" // ✅ 탭 이름 (탭 전환 시 사용하는 key)
        component={MainScreen} // ✅ 이 탭을 누르면 보여줄 화면 컴포넌트
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} /> // ✅ 탭에 표시될 아이콘
          ),
          tabBarLabel: 'Main', // ✅ 하단 탭에 보이는 글자
        }}
      />

      {/* 📅 캘린더 탭 */}
      <Tab.Screen
        name="캘린더"
        component={CalenderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" size={24} color={color} />
          ),
        }}
      />

      {/* 👤 마이페이지 탭 */}
      <Tab.Screen
        name="Mypage"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
