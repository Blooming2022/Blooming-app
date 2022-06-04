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
  //타이틀에 값이 입력된 경우 하단의 save버튼 활성화 체크를 위한 상태값
  const [memo, setMemo] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [misAlarmStop, setMisAlarmStop] = useState('');
  const [misAlarmStart, setMisAlarmStart] = useState('');
  const [misAlarmStopTime, setMisAlarmStopTime] = useState('');
  const [misAlarmStartTime, setMisAlarmStartTime] = useState('');
  let isMisSelfText = misInfo.isMisSelf? "셀프" : "랜덤";
  const [isValid, setIsValid] = useState(false);
  const navigation = useNavigation();

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
      misMemo : memo,
      hasReview : false,
    }
    // createCurrentMis(misData);
    navigation.navigate('MissionDetail', {misData: misData});
  } 
  return (
    <>
      <CompleteHeader
      navigation={navigation}
      title= {isMisSelfText + " 미션 추가"}
      isValid={isValid}
      completeFunction={createMission}></CompleteHeader>
      <View style={styles.container}>
        <MisTitleInput
          misTitle={title}
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
        {period == 1 && <SelectMisMonth />}
        {period == 2 && <SelectMisSeason />}
  
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
            misAlarmStopTime={misAlarmStopTime}
            setMisAlarmStopTime={setMisAlarmStopTime}
          /> */}
      </View>
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
