import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MissionWeek from "../containers/mission/home/MissionWeek";
import MissionMonth from "../containers/mission/home/MissionMonth";
import MissionSeason from "../containers/mission/home/MissionSeason";

const Tab = createMaterialTopTabNavigator();
const MissionTabNavigator = () =>
{
    return (
      <Tab.Navigator>
        <Tab.Screen name="MissionWeek" component={MissionWeek} />
        <Tab.Screen name="MissionMonth" component={MissionMonth} />
        <Tab.Screen name="MissionSeason" component={MissionSeason} />
      </Tab.Navigator>
    );
}

export default MissionTabNavigator;
