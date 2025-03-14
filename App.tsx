import React from 'react';
import { AppRegistry } from 'react-native';
import BottomNav from './navigation/BottomNav';
import { name as appName } from './app.json';

const App = () => {
  return <BottomNav />;
};

AppRegistry.registerComponent(appName, () => App);

export default App;
