import React from 'react';
import {View, Text, Button} from 'react-native';

const MissionCreate = ({navigation}) => {
  return (
    <View>
      <Text>mission create</Text>
      <Button
        // test
        onPress={() => {
          navigation.navigate('ReviewCreate');
        }}
        title="review create"></Button>
    </View>
  );
};

export default MissionCreate;
