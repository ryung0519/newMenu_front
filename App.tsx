import React from 'react';
import MainStack from './navigation/MainStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './contexts/AuthContext';
import {SafeAreaView} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings'; // ✅ 추가!

const App = () => {
  return (
    <RootSiblingParent>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthProvider>
            <MainStack />
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default App;
