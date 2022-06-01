import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Report from '../../containers/report/Report';
import Level from '../../containers/report/Level';

const Stack = createNativeStackNavigator();

const ReportStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Level" component={Level} />
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

export default ReportStackNavigator;
