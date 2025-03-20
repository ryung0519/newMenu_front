import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://52.79.249.48:8080/api/auth"; // Spring Boot 서버 주소

// 🔹 회원가입 함수 (Firebase + Oracle 연동)
export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
  preferredFood: string,
  allergicFood: string
) => {
  try {
    // ✅ Firebase에서 계정 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Firebase에서 ID 토큰 가져오기
    const firebaseIdToken = await user.getIdToken();

    // ✅ Spring Boot 서버로 회원정보 전송 (JSON 형식)
    const response = await axios.post(`${API_BASE_URL}/register`, 
      {
        token: firebaseIdToken, // Firebase ID 토큰
        name, 
        email, 
        preferredFood, 
        allergicFood
      },
      {
        headers: { "Content-Type": "application/json" } 
      }
    );

    if (response.status === 200) {
      console.log("✅ 회원가입 성공:", response.data);

      // ✅ AsyncStorage에 저장 (자동 로그인 지원)
      await AsyncStorage.setItem("userToken", firebaseIdToken);
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));

      return { success: true, user: response.data };
    }
  } catch (error: any) {
    console.error("회원가입 실패:", error?.message || "알 수 없는 오류");
    return { success: false, error: error.response?.data?.message || "회원가입 실패" };
  }
};

// 🔹 로그인 함수 (Firebase 인증 + Oracle DB 연동)
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // ✅ Firebase 로그인
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Firebase에서 ID 토큰 가져오기
    const firebaseIdToken = await user.getIdToken();

    // ✅ Spring Boot 서버로 ID 토큰 전송 (JSON으로 감싸서 전송)
    const response = await axios.post(`${API_BASE_URL}/login`, 
      { token: firebaseIdToken },  // <-- JSON으로 감싸야 함
      {
        headers: { "Content-Type": "application/json" } // <-- JSON 형식으로 전송
      }
    );

    if (response.status === 200) {
      console.log("✅ 로그인 성공:", response.data);

      // ✅ AsyncStorage에 로그인 정보 저장
      await AsyncStorage.setItem("userToken", firebaseIdToken);
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));

      return { success: true, user: response.data };
    }
  } catch (error: any) {
    console.error("로그인 실패:", error?.message || "알 수 없는 오류");
    return { 
      success: false, 
      error: error.response?.data?.message || "로그인 실패" 
    };
  }
};

// 🔹 로그아웃 함수 (AsyncStorage에서 토큰 제거)
export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");
    console.log("✅ 로그아웃 성공");
    return { success: true };
  } catch (error) {
    console.error("로그아웃 실패:", error);
    return { success: false, error: "로그아웃 실패" };
  }
};

// 🔹 저장된 사용자 데이터 불러오기
export const getStoredUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("사용자 데이터 불러오기 실패:", error);
    return null;
  }
};
