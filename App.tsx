import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import MainStack from './navigation/MainStack';

const App = () => {
  return <MainStack />;
};

AppRegistry.registerComponent(appName, () => App);

export default App;
