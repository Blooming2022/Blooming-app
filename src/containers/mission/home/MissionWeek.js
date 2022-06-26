import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getCurrentMisList} from '../../../service/missionServices';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionWeekFlower from './components/MissionWeekFlower';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const MissionWeek = () => {
  const [missionList, setMissionList] = useState([]);
  const {isMissionChanged} = useMissionChanged();
  const {isReviewChanged} = useReviewChanged();

  useEffect(() => {
    getCurrentMisList(0).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged, isReviewChanged]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번주" remainingTime={4} period={0}></DdayCount>
      <MissionWeekFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionWeekFlower>
      <MissionList style={styles.missionList} missionList={missionList}></MissionList>
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
