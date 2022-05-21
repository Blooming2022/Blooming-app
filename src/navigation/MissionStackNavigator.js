import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import MissionCreateSelectModal from '../containers/mission/create/MissionCreateSelectModal';
import AddSelfMission from '../containers/mission/create/AddSelfMission';
import AddRandomMission from '../containers/mission/create/AddRandomMission';

const MissionStack = createNativeStackNavigator();

const MissionStackNavigator = () => {
  return (
    // <NavigationContainer>
    <MissionStack.Navigator
    //   screenOptions={{
    //     headerShown: false
    // }}
    >
      <MissionStack.Group>
        <MissionStack.Screen name="AddSelfMission" component={AddSelfMission} />
        <MissionStack.Screen
          name="AddRandomMission"
          component={AddRandomMission}
        />
      </MissionStack.Group>
      {/* <MissionStack.Group screenOptions={{presentation: 'modal'}}>
        <MissionStack.Screen
          name="추가할 미션 선택"
          component={MissionCreateSelectModal}
        />
      </MissionStack.Group> */}
    </MissionStack.Navigator>
    // </NavigationContainer>
  );
};

export default MissionStackNavigator;
