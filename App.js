import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () =>
{
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  } );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainTabNavigator></MainTabNavigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
});

export default App;
