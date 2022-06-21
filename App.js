import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainStackNavigator from './src/navigation/Stack/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/containers/login/Login';
import {getCurrentUser} from './src/service/authServices';
// import {getCurrentMisList} from './src/service/missionServices';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(getCurrentUser());
  useEffect(() => {
    try {
      if (getCurrentUser() == null) {
        setTimeout(() => {
          SplashScreen.hide();
        }, 2000);
      } else {
        // getCurrentMisList();
        setIsLoggedIn(true);
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <MainStackNavigator></MainStackNavigator>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn}></Login>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
