import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import MissionItem from './MissionItem';
const MissionList = ({missionList, setMissionList}) => {
  return (
    <ScrollView>
      {missionList.length !== 0 ? (
        missionList.map((item, index) => (
          <MissionItem
            mission={item}
            key={index}
            missionList={missionList}
            setMissionList={setMissionList}
          />
        ))
      ) : (
        <View style={styles.noItem}>
          <Text>당신의 삶을 변화시킬</Text>
          <Text>특별한 미션을 만들어보세요!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noItem: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default MissionList;
