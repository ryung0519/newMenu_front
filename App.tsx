// 리액트 관련 기본 모듈
import React from 'react';
import MainStack from './navigation/MainStack';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const App = () => {
  return <MainStack />;
};
AppRegistry.registerComponent(appName, () => App);

export default App;
