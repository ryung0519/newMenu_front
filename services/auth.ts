import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getFirebaseAuth} from '../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
  preferredFood: string,
  allergicFood: string,
) => {
  const auth = getFirebaseAuth(); // ✅ 지연 호출

  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();

    const {data} = await axios.post(`${API_URL}/register`, {
      token,
      name,
      email,
      preferredFood,
      allergicFood,
    });

    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    return {success: true, user: data};
  } catch (error: any) {
    console.error('회원가입 실패:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  const auth = getFirebaseAuth(); // ✅ 지연 호출

  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();

    const {data} = await axios.post(`${API_URL}/api/auth/login`, {token});

    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    return {success: true, user: data};
  } catch (error: any) {
    console.error('로그인 실패:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.clear();
    return {success: true};
  } catch (error) {
    console.error('로그아웃 실패:', error);
    return {success: false};
  }
};

export const getStoredUserData = async () => {
  const data = await AsyncStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};
