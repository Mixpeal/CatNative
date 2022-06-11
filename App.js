import * as React from 'react';
import MainTab from './navigation/MainTab';
import {SafeAreaView, StatusBar} from 'react-native'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle='dark-content'
        showHideTransition={false}
        hidden={false} />
      <MainTab />
    </SafeAreaView>
  );
}
