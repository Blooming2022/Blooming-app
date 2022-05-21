import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionMonthFlower from './components/MissionMonthFlower';

const MissionMonth = () => {
  const [missionList, setMissionList] = useState([]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번달" remainingTime={4} period={1}></DdayCount>
      <MissionMonthFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionMonthFlower>
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
    marginTop: 60,
  },
});

export default MissionMonth;
