import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionWeekFlower from './components/MissionWeekFlower';

const MissionWeek = () => {
  const [missionList, setMissionList] = useState([]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번주" remainingTime={4} period={0}></DdayCount>
      <MissionWeekFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionWeekFlower>
      <MissionList
        style={styles.missionList}
        missionList={missionList}
        setMissionList={setMissionList}></MissionList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  missionList: {
    marginTop: 5,
  },
});

export default MissionWeek;
