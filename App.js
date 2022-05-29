import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainStackNavigator from './src/navigation/Stack/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <MainStackNavigator></MainStackNavigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
