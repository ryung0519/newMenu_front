import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 메인 페이지에 오신 걸 환영해요!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default MainPage;