import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReviewWeek from '../../containers/review/home/ReviewWeek';
import ReviewMonth from '../../containers/review/home/ReviewMonth';
import ReviewSeason from '../../containers/review/home/ReviewSeason';

const Tab = createMaterialTopTabNavigator();
const ReviewTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarShowLabel={false}
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold', lineHeight: 18},
        tabBarStyle: {
          width: '90%',
          height: 42,
          borderRadius: 35,
          marginTop: 10,
          marginHorizontal: '5%',
        },
        tabBarIndicatorStyle: {
          height: 42,
          borderRadius: 35,
          backgroundColor: '#242424',
        },
      }}>
      <Tab.Screen name="ReviewWeek" component={ReviewWeek} options={{tabBarLabel: '한주'}} />
      <Tab.Screen name="ReviewMonth" component={ReviewMonth} options={{tabBarLabel: '한달'}} />
      <Tab.Screen name="ReviewSeason" component={ReviewSeason} options={{tabBarLabel: '계절'}} />
    </Tab.Navigator>
  );
};

export default ReviewTabNavigator;
