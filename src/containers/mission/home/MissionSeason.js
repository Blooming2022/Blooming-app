import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MissionList from './components/MissionList';
import DdayCount from './components/DdayCount';
import MissionSeasonFlower from './components/MissionSeasonFlower';
import {getCurrentMisList} from '../../../service/missionServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';

const MissionSeason = () => {
  const [missionList, setMissionList] = useState([]);
  const {isMissionChanged} = useMissionChanged();

  useEffect(() => {
    getCurrentMisList(2).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번 계절" remainingTime={4} period={2}></DdayCount>
      <MissionSeasonFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionSeasonFlower>
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

export default MissionSeason;
