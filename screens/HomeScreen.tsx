import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  // 유저 아이디 상태 관리
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.subtitle}>customer</Text>

      {/* 로그인 정보 입력 박스 */}
      <View style={styles.loginBox}>
        {/* 사용자 아이디를 입력받는 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#7a7a7a"
        />

        {/* 사용자 비밀번호를 입력받는 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#7a7a7a"
          secureTextEntry
        />

        {/* 버튼 컨테이너 */}
        <View style={styles.buttonContainer}>
          
          {/* 로그인 버튼 */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>

          {/* 회원가입 버튼 (SignupScreen으로 이동) */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Signup')} // 네비게이션 사용
          >
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
