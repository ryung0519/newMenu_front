import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signInWithGoogle } from "../api/auth"; // Firebase 로그인 함수 가져오기

const HomeScreen = () => {
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (!user) {
      Alert.alert("로그인 실패", "다시 시도해주세요.");
      return;
    }
    Alert.alert("로그인 성공", `${user.displayName}님 환영합니다!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>customer</Text>

      <View style={styles.loginBox}>
        <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#7a7a7a" />
        <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#7a7a7a" secureTextEntry />

        {/* Google 로그인 버튼에 이벤트 추가 */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Google 로그인</Text>
        </TouchableOpacity>

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
