import * as Google from "expo-auth-session/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import axios from "axios";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

// ✅ Expo WebBrowser 자동 닫기 설정 (필수)
WebBrowser.maybeCompleteAuthSession();

// ✅ Spring Boot API URL 설정
const API_BASE_URL = "http://52.79.249.48:8080/auth";

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "981339430588-glm7m7rdood03k4umvfudsd91gbo64j6.apps.googleusercontent.com", 
    redirectUri: "https://iot7-435d1.firebaseapp.com/__/auth/handler",
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const idToken = response.authentication.idToken;
      if (idToken) {
        signInWithGoogle(idToken);
      } else {
        console.error("🚨 ID 토큰이 없습니다!");
      }
    }
  }, [response]);

  async function signInWithGoogle(idToken: string) {
    try {
      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;

      console.log("✅ Firebase 로그인 성공:", user);

      // ✅ Firebase에서 ID 토큰 가져오기
      const firebaseIdToken = await user.getIdToken();

      // ✅ Spring Boot 서버로 ID 토큰 전송
      const response = await axios.post(`${API_BASE_URL}/google-login`, { idToken: firebaseIdToken });

      if (response.status === 200) {
        console.log("✅ 로그인 성공: 사용자 정보가 Oracle DB에 저장됨");
      } else {
        throw new Error("서버 응답 오류");
      }
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  }

  return { request, promptAsync };
}
