import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MissionItem from './components/MissionItem';
import MissionWeekFlower from './components/MissionWeekFlower';

const MissionWeek = () =>
{
  const [mission0, setMission0] = useState(false);
  const [mission1, setMission1] = useState(true);
  const [mission2, setMission2] = useState(false);
  const [ mission3, setMission3 ] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번주</Text>
      <Text style={styles.Dday}>D-4</Text>
      <MissionWeekFlower mis0={mission0} mis1={mission1} mis2={mission2} mis3={mission3}></MissionWeekFlower>
      <View style={styles.missionBox}>
        <MissionItem title='물마시기' missionNum={0} mission={mission0} setMission={setMission0}></MissionItem>
        <MissionItem title='아침/산책/요가' missionNum={1} mission={mission1} setMission={setMission1}></MissionItem>
        <MissionItem title='새벽다섯시이전에자기열네글자' missionNum={2} mission={mission2} setMission={setMission2}></MissionItem>
        <MissionItem title='운동/뜨개질/낮잠' missionNum={3} mission={mission3} setMission={setMission3}></MissionItem>
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
});

export default MissionWeek;
