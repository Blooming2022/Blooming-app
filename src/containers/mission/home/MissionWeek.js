import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionWeekFlower from './components/MissionWeekFlower';

const MissionWeek = () => {
  const [missionList, setMissionList] = useState([]);
  const [picture, setPicture] = useState([null, null, null, null]);
  // const [currentSelf, setCurrentSelf] = useState(0);
  // const [currentRandom, setCurrentRandom] = useState(0);

  return (
    <View style={styles.container}>
      <DdayCount title="이번주" remainingTime={4} period={0}></DdayCount>
      <MissionWeekFlower
        missionList={missionList}
        setMissionList={setMissionList}
        picture={picture}
        setPicture={setPicture}></MissionWeekFlower>
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
    marginTop: 5,
  },
});

export default MissionWeek;
