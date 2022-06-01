import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Report = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Initial Report</Text>
      <Button
        // test
        onPress={() => {
          navigation.navigate('OutdatedMissionDetail');
        }}
        title="go OutdatedMissionDetail"></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Report;
