import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MissionItem from './components/MissionItem';
import MissionSeasonFlower from './components/MissionSeasonFlower';

const MissionSeason = () =>
{
  const [mission0, setMission0] = useState(false);
  const [mission1, setMission1] = useState(false);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>이번달</Text>
        <Text style={styles.Dday}>D-4</Text>
        <MissionSeasonFlower mis0={mission0} mis1={mission1}></MissionSeasonFlower>
      <View style={styles.missionBox}>
        <MissionItem title='물마시기' missionNum={3} mission={mission0} setMission={setMission0}></MissionItem>
        <MissionItem title='아침/산책/요가' missionNum={0} mission={mission1} setMission={setMission1}></MissionItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    paddingTop: 30,
    fontSize: 16,
    color: '#242424'
  },
  Dday: {
    fontSize: 36,
    color: '#242424'
  },
  missionBox: {
    marginTop:60
  }
});

export default MissionSeason;
