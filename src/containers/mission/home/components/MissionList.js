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
          <Text style={styles.noItemText}>당신의 삶을 변화시킬</Text>
          <Text style={styles.noItemText}>특별한 꽃을 피워보세요!</Text>
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
  noItemText: {
    fontSize: 16,
    color: '#242424',
  },
});

export default MissionList;
