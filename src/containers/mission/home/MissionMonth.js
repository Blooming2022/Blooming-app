import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionMonthFlower from './components/MissionMonthFlower';
import {getCurrentMisList} from '../../../service/missionServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const MissionMonth = () => {
  const [missionList, setMissionList] = useState([]);
  const {isMissionChanged} = useMissionChanged();
  const {isReviewChanged} = useReviewChanged();

  useEffect(() => {
    getCurrentMisList(1).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged, isReviewChanged]);

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
