import React from 'react';
import MainStack from './navigation/MainStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './contexts/AuthContext';
import {SafeAreaView} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import PushTokenSender from './components/PushTokenSender';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 팝업 표시
    shouldPlaySound: false, // 소리 없음
    shouldSetBadge: false, // 아이콘 배지 없음
    shouldShowBanner: false, // 상단 배너 표시
    shouldShowList: false, // iOS 알림 센터 표시
    shouldShowInForeground: true, // 앱 실행 중에도 표시
  }),
});

const App = () => {
  return (
    <RootSiblingParent>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthProvider>
            <PushTokenSender />
            <MainStack />
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default App;
