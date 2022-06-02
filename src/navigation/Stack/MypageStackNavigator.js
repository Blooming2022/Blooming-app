import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPage from '../../containers/myPage/MyPage';
import MyInfo from '../../containers/myPage/MyInfo';
import BackUp from '../../containers/myPage/BackUp';
import Settings from '../../containers/myPage/Settings';
import Notice from '../../containers/myPage/Notice';

const Stack = createNativeStackNavigator();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="BackUp" component={BackUp} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Notice" component={Notice} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  buttonImage: {
    height: 20,
    resizeMode: 'contain',
  },
});

export default MyPageNavigator;
