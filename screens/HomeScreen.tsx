import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useGoogleAuth } from "../api/auth"; // ✅ Google OAuth 훅 가져오기

const HomeScreen = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { promptAsync } = useGoogleAuth(); // ✅ Google 로그인 훅 사용

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync(); // ✅ Google 로그인 실행
      if (result?.type === "success") {
        Alert.alert("로그인 성공", "Google 인증이 완료되었습니다!");
      } else {
        Alert.alert("로그인 실패", "Google 로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      Alert.alert("로그인 오류", "로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>customer</Text>

      <View style={styles.loginBox}>
        <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#7a7a7a" />
        <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#7a7a7a" secureTextEntry />

        {/* ✅ Google 로그인 버튼 (기존 스타일 유지) */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Google 로그인</Text>
        </TouchableOpacity>

        {/* ✅ 기존 버튼 스타일 유지 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ✅ 기존 스타일 그대로 유지
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0fc",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6a3cbc",
  },
  subtitle: {
    fontSize: 18,
    color: "#6a3cbc",
    marginBottom: 20,
  },
  loginBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#6a3cbc",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#6a3cbc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  googleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#6a3cbc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  signupButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6a3cbc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signupText: {
    color: "#6a3cbc",
    fontWeight: "bold",
  },
});

export default HomeScreen;
