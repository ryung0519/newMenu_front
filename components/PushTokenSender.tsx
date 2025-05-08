import {useEffect, useContext} from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
import {API_URL} from '@env';

const PushTokenSender = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const registerAndSendToken = async () => {
      if (!user) return;

      try {
        if (Device.isDevice) {
          const {status: existingStatus} =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            console.log('❌ 푸시 권한 거부됨');
            return;
          }

          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('📱 내 Expo 토큰:', token);

          // ✅ 백엔드에 토큰 전송
          await axios.post(`${API_URL}/api/push-token`, {
            userId: user.userId,
            pushToken: token,
          });

          console.log('✅ 푸시 토큰 서버 전송 완료');
        } else {
          console.log('❌ 에뮬레이터는 푸시 지원 안 함');
        }
      } catch (err) {
        console.error('🔥 푸시 토큰 전송 실패:', err);
      }
    };

    registerAndSendToken();
  }, [user]);

  return null; // UI는 없지만 앱 시작 시 자동 실행
};

export default PushTokenSender;
