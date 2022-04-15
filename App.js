import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainTabNavigator></MainTabNavigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
});

export default App;
