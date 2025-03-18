import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>customer</Text>

      <View style={styles.loginBox}>
        <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#7a7a7a" />
        <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#7a7a7a" secureTextEntry />

        <TouchableOpacity style={styles.googleButton}>
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
