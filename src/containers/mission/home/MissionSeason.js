import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MissionList from './components/MissionList';
import DdayCount from './components/DdayCount';
import MissionSeasonFlower from './components/MissionSeasonFlower';

const MissionSeason = () => {
  const [missionList, setMissionList] = useState([]);
  const [picture, setPicture] = useState([null, null]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번 계절" remainingTime={4} period={2}></DdayCount>
      <MissionSeasonFlower
        missionList={missionList}
        setMissionList={setMissionList}
        picture={picture}
        setPicture={setPicture}></MissionSeasonFlower>
      <MissionList
        style={styles.missionList}
        missionList={missionList}
        setMissionList={setMissionList}
        picture={picture}
        setPicture={setPicture}></MissionList>
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
  title: {
    paddingTop: 30,
    fontSize: 16,
    color: '#242424',
  },
  Dday: {
    fontSize: 36,
    color: '#242424',
  },
  missionList: {
    marginTop: 60,
  },
});

export default MissionSeason;
