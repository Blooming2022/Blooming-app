import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MissionTabNavigator from "./MissionTabNavigator";
import Review from '../containers/review/Review';
import Report from '../containers/report/Report';
import MyPage from '../containers/myPage/MyPage';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () =>
{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="MissionTabNavigator"
          component={MissionTabNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Review" component={Review} />
        <Tab.Screen name="Report" component={Report} />
        <Tab.Screen name="Mypage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;
