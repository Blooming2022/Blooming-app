import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {getCurrentMisList, getTargetTime, clearCurrentMisList} from '../../../service/missionServices';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionWeekFlower from './components/MissionWeekFlower';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';
import {getKSTTime} from '../../../service/commonServices';

const MissionWeek = () => {
  const [missionList, setMissionList] = useState([]);
  const {isMissionChanged, setIsMissionChanged} = useMissionChanged();
  const {isReviewChanged} = useReviewChanged();
  const timerId = useRef(null);
  const [remainDay, setRemainDay] = useState(0);
  let now;
  let targetTime;
  let diff; // gap of now and targetTime
  let newRemainDay;
  const [isTargetTimeChanged, setIsTargetTimeChanged] = useState(false); // notify new targetTime

  const checkWeekTime = () => {
    now = getKSTTime();
    if(targetTime === now) {
      clearCurrentMisList(0);
      clearInterval(timerId.current);
      setIsTargetTimeChanged(!isTargetTimeChanged);
      setIsMissionChanged(!isMissionChanged);
    }
    diff = targetTime-now;
    newRemainDay = Math.ceil(diff/(1000*60*60*24));
    if (newRemainDay !== remainDay) {
      setRemainDay(newRemainDay);
    }
  }

  useEffect(() => {
    getCurrentMisList(0).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged, isReviewChanged]);

  useEffect(() => {
    const getTime = async () => {
      targetTime = await getTargetTime(0);
    }
    getTime();
    timerId.current = setInterval(checkWeekTime, 1000);
    return (() => clearInterval(timerId.current));
  }, [isTargetTimeChanged]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번주" remainingTime={remainDay}></DdayCount>
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
