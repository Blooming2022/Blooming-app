import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisPeriodSelectBtn from './components/MisPeriodSelectBtn';
import MisTitleInput from './components/MisTitleInput';
import SelectMisWeek from './components/SelectMisWeek';
import SelectMisMonth from './components/SelectMisMonth';
import SelectMisSeason from './components/SelectMisSeason';
import MisMemoField from './components/MisMemoField';
// import MisAlarmField from './components/MisAlarmField';
import { createCurrentMis } from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';

const MissionCreate = ({route}) => {
  const misInfo = route.params.misInfo;
  const [period, setPeriod] = useState(misInfo.period);
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [misStartWeek, setMisStartWeek] = useState('');
  const [misStopWeek, setMisStopWeek] = useState('');
  const [misMonth, setMisMonth] = useState('');
  const [misSeason, setMisSeason] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [alarmStart, setAlarmStart] = useState('');
  const [alarmStop, setAlarmStop] = useState('');
  // const [alarmStartTime, setAlarmStartTime] = useState('');
  // const [alarmStopTime, setAlarmStopTime] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigation = useNavigation();
  let isMisSelfText = misInfo.isMisSelf? "셀프" : "랜덤";

  useEffect(() => {
    if (title !== '')  {
      setIsValid(true);
    } else
      setIsValid(false);
  }, [title]);

  const createMission = () => {
    let misData = {
      misTitle: title,
      misPeriod: period,
      picNum: misInfo.picNum,
      isSuccess : false,
      successDate : null,
      isMisSelf : misInfo.isMisSelf,
      isAlarmSet : isAlarmSet,
      // misAlarmHour
      // misAlarmMinute
      // misAlarmStart
      // misAlarmStop
      misMemo : memo,
      hasReview : false,
    }
    createCurrentMis(misData);
    navigation.navigate('MissionDetail', {misData: misData});
  } 
  return (
    <>
      <CompleteHeader
      navigation={navigation}
      title= {isMisSelfText + " 미션 추가"}
      isValid={isValid}
      completeFunction={createMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisTitleInput
          setMisTitle={setTitle}
          ></MisTitleInput>
  
        <View style={styles.periodButtonContainer}>
          <MisPeriodSelectBtn
            buttontext={'한주'}
            selectedId={0}
            period={period}
            setPeriod={setPeriod}></MisPeriodSelectBtn>
          <MisPeriodSelectBtn
            buttontext={'한달'}
            selectedId={1}
            period={period}
            setPeriod={setPeriod}></MisPeriodSelectBtn>
          <MisPeriodSelectBtn
            buttontext={'계절'}
            selectedId={2}
            period={period}
            setPeriod={setPeriod}></MisPeriodSelectBtn>
        </View>
        {period == 0 && <SelectMisWeek />}
        {period == 1 && <SelectMisMonth setMisMonth={setMisMonth}/>}
        {period == 2 && <SelectMisSeason setMisSeason={setMisSeason}/>}
  
        <View style={styles.separator}></View>
        <MisMemoField memo={memo} setMemo={setMemo} />
        <View style={styles.separator}></View>
  
        {/* 알람 on/off 여부 및 알람 설정하는 모듈 */}
        {/* <MisAlarmField
            isAlarmSet={isAlarmSet}
            setIsAlarmSet={setIsAlarmSet}
            misAlarmStart={misAlarmStart}
            setMisAlarmStart={setMisAlarmStart}
            misAlarmStop={misAlarmStop}
            setMisAlarmStop={setMisAlarmStop}
            misAlarmStartTime={misAlarmStartTime}
            setMisAlarmStartTime={setMisAlarmStartTime}
            AlarmStopTime={AlarmStopTime}
            setAlarmStopTime={setAlarmStopTime}
          /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff'
  },
  periodButtonContainer: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C7',
  },
});

export default MissionCreate;
