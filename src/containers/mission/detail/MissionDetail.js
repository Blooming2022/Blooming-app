import React from 'react';
import {View, Text} from 'react-native';

const MissionDetail = ({route}) => {
  const misData = route.params.misData;
  return (
    <View>
      <Text>missionDetail</Text>
      <Text>{misData.misTitle}</Text>
    </View>
  );
};

export default MissionDetail;
