import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from '../Tab/MainTabNavigator';
import MissionCreate from '../../containers/mission/create/MissionCreate';
import RandomMissionGenerate from '../../containers/mission/create/RandomMissionGenerate';
import MissionDetail from '../../containers/mission/detail/MissionDetail';
import MissionUpdate from '../../containers/mission/update/MissionUpdate';
import ReviewCreate from '../../containers/review/create/ReviewCreate';
import PrevMisReviewCreate from '../../containers/report/components/PrevMisReviewCreate';
import ReviewDetail from '../../containers/review/detail/ReviewDetail';
import ReviewUpdate from '../../containers/review/update/ReviewUpdate';
import Login from '../../containers/login/Login';
import PrevSuccessMissionList from '../../containers/report/PrevSuccessMissionList';
import PrevSuccessMissionDetail from '../../containers/report/PrevSuccessMissionDetail';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="MissionCreate" component={MissionCreate} />
        <Stack.Screen name="RandomMissionGenerate" component={RandomMissionGenerate} />
        <Stack.Screen name="MissionDetail" component={MissionDetail} />
        <Stack.Screen name="MissionUpdate" component={MissionUpdate} />
        <Stack.Screen name="ReviewCreate" component={ReviewCreate} />
        <Stack.Screen name="PrevMisReviewCreate" component={PrevMisReviewCreate} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
        <Stack.Screen name="ReviewUpdate" component={ReviewUpdate} />
        <Stack.Screen name="PrevSuccessMissionList" component={PrevSuccessMissionList} />
        <Stack.Screen name="PrevSuccessMissionDetail" component={PrevSuccessMissionDetail} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default MainStackNavigator;
