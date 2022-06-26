import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import DdayCount from './components/DdayCount';
import MissionList from './components/MissionList';
import MissionMonthFlower from './components/MissionMonthFlower';
import {getCurrentMisList, getTargetTime, clearCurrentMisList} from '../../../service/missionServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';
import {getKSTTime} from '../../../service/commonServices';

const MissionMonth = () => {
  const [missionList, setMissionList] = useState([]);
  const {isMissionChanged} = useMissionChanged();
  const {isReviewChanged} = useReviewChanged();
  const timerId = useRef(null);
  const [remainDay, setRemainDay] = useState(0);
  let now;
  let targetTime;
  let diff; // gap of now and targetTime
  let newRemainDay;
  const [isTargetTimeChanged, setIsTargetTimeChanged] = useState(false); // notify new targetTime

  const checkMonthTime = () => {
    now = getKSTTime();
    if(targetTime === now) {
      clearCurrentMisList(1);
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
    getCurrentMisList(1).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged, isReviewChanged]);

  useEffect(() => {
    const getTime = async () => {
      targetTime = await getTargetTime(1);
    }
    getTime();
    timerId.current = setInterval(checkMonthTime, 1000);
    return (() => clearInterval(timerId.current));
  }, [isTargetTimeChanged]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번달" remainingTime={remainDay}></DdayCount>
      <MissionMonthFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionMonthFlower>
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
    marginTop: 60,
  },
});

export default MissionMonth;
