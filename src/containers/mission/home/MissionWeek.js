import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MissionList from './components/MissionList';
import MissionWeekFlower from './components/MissionWeekFlower';

const initialList = [
  {
    title: '물마시기',
    picNum: 0,
    type: 0,
    period: 0,
    misMemo: '',
    isSuccess: true,
  },
  {
    title: '아침/산책/요가',
    picNum: 1,
    type: 1,
    period: 0,
    misMemo: '',
    isSuccess: false,
  },
];

const MissionWeek = () => {
  const [missionList, setMissionList] = useState(initialList);
  const [picture, setPicture] = useState([true, false, null, null]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번주</Text>
      <Text style={styles.Dday}>D-4</Text>
      <MissionWeekFlower
        missionList={missionList}
        setMissionList={setMissionList}
        picture={picture}
        setPicture={setPicture}></MissionWeekFlower>
      <MissionList
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
  missionBox: {
    marginTop: 5,
  },
});

export default MissionWeek;
