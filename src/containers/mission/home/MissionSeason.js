import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MissionList from './components/MissionList';
import DdayCount from './components/DdayCount';
import MissionSeasonFlower from './components/MissionSeasonFlower';
import {getCurrentMisList, getTargetTime, clearCurrentMisList} from '../../../service/missionServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';
import {getKSTTime} from '../../../service/commonServices';

const MissionSeason = () => {
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

  const checkSeasonTime = () => {
    now = getKSTTime();
    if(targetTime === now) {
      clearCurrentMisList(2);
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
    getCurrentMisList(2).then(missionList => {
      setMissionList(missionList);
    });
  }, [isMissionChanged, isReviewChanged]);

  useEffect(() => {
    const getTime = async () => {
      targetTime = await getTargetTime(2);
    }
    getTime();
    timerId.current = setInterval(checkSeasonTime, 1000);
    return (() => clearInterval(timerId.current));
  }, [isTargetTimeChanged]);

  return (
    <View style={styles.container}>
      <DdayCount title="이번 계절" remainingTime={remainDay}></DdayCount>
      <MissionSeasonFlower
        missionList={missionList}
        setMissionList={setMissionList}></MissionSeasonFlower>
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

export default MissionSeason;
