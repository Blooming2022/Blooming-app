import * as React from 'react';
import {Image} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MissionTabNavigator from './MissionTabNavigator';
import Review from '../containers/review/Review';
import Report from '../containers/report/Report';
import MyPage from '../containers/myPage/MyPage';
import Nickname from '../containers/login/Nickname';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let src;

          if (route.name === 'MissionTabNavigator') {
            src = focused
              ? require('../assets/images/missionTabActive.png')
              : require('../assets/images/missionTab.png');
          } else if (route.name === 'Review') {
            src = focused
              ? require('../assets/images/reviewTabActive.png')
              : require('../assets/images/reviewTab.png');
          } else if (route.name === 'Report') {
            src = focused
              ? require('../assets/images/reportTabActive.png')
              : require('../assets/images/reportTab.png');
          } else if (route.name === 'Mypage') {
            src = focused
              ? require('../assets/images/myTabActive.png')
              : require('../assets/images/myTab.png');
          }
          return <Image source={src} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#242424',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          paddingBottom: 8,
        },
        tabBarStyle: {height: 60, borderRadius: 8, paddingVertical: 4},
      })}>
      <Tab.Screen
        name="MissionTabNavigator"
        component={MissionTabNavigator}
        options={{tabBarLabel: '미션'}}
      />
      <Tab.Screen
        name="Review"
        component={Review}
        options={{tabBarLabel: '후기'}}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{tabBarLabel: '분석'}}
      />
      <Tab.Screen
        name="Mypage"
        component={Nickname}
        options={{tabBarLabel: 'My'}}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainTabNavigator;
