import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MissionTabNavigator from './MissionTabNavigator';
import ReviewTabNavigator from './ReivewTabNavigator';
import ReportStackNavigator from '../Stack/ReportStackNavigator';
import MyPageStackNavigator from '../Stack/MypageStackNavigator';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let src;

          if (route.name === 'MissionHome') {
            src = focused
              ? require('../../assets/images/missionTabActive.png')
              : require('../../assets/images/missionTab.png');
          } else if (route.name === 'ReviewHome') {
            src = focused
              ? require('../../assets/images/reviewTabActive.png')
              : require('../../assets/images/reviewTab.png');
          } else if (route.name === 'ReportHome') {
            src = focused
              ? require('../../assets/images/reportTabActive.png')
              : require('../../assets/images/reportTab.png');
          } else if (route.name === 'MypageHome') {
            src = focused
              ? require('../../assets/images/myTabActive.png')
              : require('../../assets/images/myTab.png');
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
      <Tab.Screen name="MissionHome" component={MissionTabNavigator} options={{tabBarLabel: '미션'}} />
      <Tab.Screen
        name="ReviewHome"
        component={ReviewTabNavigator}
        options={{tabBarLabel: '후기'}}
      />
      <Tab.Screen
        name="ReportHome"
        component={ReportStackNavigator}
        options={{tabBarLabel: '분석'}}
      />
      <Tab.Screen
        name="MypageHome"
        component={MyPageStackNavigator}
        options={{tabBarLabel: 'My'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;