import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MissionWeek from "../containers/mission/home/MissionWeek";
import MissionMonth from "../containers/mission/home/MissionMonth";
import MissionSeason from "../containers/mission/home/MissionSeason";

const Tab = createMaterialTopTabNavigator();
const MissionTabNavigator = () =>
{
    return (
      <Tab.Navigator
      tabBarShowLabel= {false}
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: { fontSize: 16, fontWeight:'bold', lineHeight:18 },
        tabBarStyle: { width: '90%', height:42, borderRadius:35, marginTop:10, marginHorizontal:'5%'},
        tabBarIndicatorStyle: { height: 42, borderRadius:35, backgroundColor:'#242424' },
      }}>
        <Tab.Screen name="MissionWeek" component={MissionWeek} options={{ tabBarLabel: '한주' }} />
        <Tab.Screen name="MissionMonth" component={MissionMonth} options={{ tabBarLabel: '한달' }}/>
        <Tab.Screen name="MissionSeason" component={MissionSeason} options={{ tabBarLabel: '계절' }}/>
      </Tab.Navigator>
    );
}

export default MissionTabNavigator;
