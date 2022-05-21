import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import MissionStackNavigator from './MissionStackNavigator';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // <NavigationContainer>
    <AppStack.Navigator>
      <AppStack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="MissionStackNavigator"
        component={MissionStackNavigator}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
