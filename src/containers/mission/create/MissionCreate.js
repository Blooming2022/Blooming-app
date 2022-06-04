import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

import MisPeriodSelectBtn from './components/MisPeriodSelectBtn';
import MisTitleInput from './components/MisTitleInput';
import SelectMisWeek from './components/SelectMisWeek';
import SelectMisMonth from './components/SelectMisMonth';
import SelectMisSeason from './components/SelectMisSeason';
import MisMemoField from './components/MisMemoField';
// import MisAlarmField from './components/MisAlarmField';

const MissionCreate = () => {
  const initperiod = 0;
  const picNum = 0;
  const [period, setPeriod] = useState(initperiod);
  const [misTitle, setMisTitle] = useState('');
  //타이틀에 값이 입력된 경우 하단의 save버튼 활성화 체크를 위한 상태값
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [misMemo, setMisMemo] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [misAlarmStop, setMisAlarmStop] = useState('');
  const [misAlarmStart, setMisAlarmStart] = useState('');
  const [misAlarmStopTime, setMisAlarmStopTime] = useState('');
  const [misAlarmStartTime, setMisAlarmStartTime] = useState('');

  return (
    <View style={styles.container}>
      {/* 미션 타이틀 입력 받는 모듈 */}
      <MisTitleInput
        misTitle={misTitle}
        setMisTitle={setMisTitle}
        setButtonDisable={setButtonDisable}></MisTitleInput>

      {/* 미션 타이틀 하단에 있는 미션 종류 선택 버튼 3가지 */}
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
      {/* 선택된 미션 종류에 따라 보여지는 캘린더 종류를 다르게 함 */}
      {period == 0 && <SelectMisWeek />}
      {period == 1 && <SelectMisMonth />}
      {period == 2 && <SelectMisSeason />}

      <View style={styles.separator}></View>

      {/* 메모 입력 받는 모듈 */}
      <MisMemoField misMemo={misMemo} setMisMemo={setMisMemo} />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
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
