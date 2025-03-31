import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalenderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉두근두근 신상업뎃 예정!</Text>
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

export default CalenderScreen;
