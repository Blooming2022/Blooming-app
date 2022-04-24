import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MissionItem from './components/MissionItem';
import MissionWeekFlower from './components/MissionWeekFlower';

const MissionWeek = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번주</Text>
      <Text style={styles.Dday}>D-4</Text>
      <MissionWeekFlower></MissionWeekFlower>
      <View style={styles.missionBox}>
        <MissionItem title='물마시기' missionNum={0}></MissionItem>
        <MissionItem title='물마시기2' missionNum={1}></MissionItem>
        <MissionItem title='물마시기3' missionNum={2}></MissionItem>
        <MissionItem title='물마시기4' missionNum={3}></MissionItem>
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
