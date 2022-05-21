import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';

import MisPeriodSelectButton from './components/MisPeriodSelectButton';

import MisTitleInput from './components/MisTitleInput';

import MisWeekCalender from './components/MisWeekCalender';
import MisMonthCalender from './components/MisMonthCalender';
import MisSeasonCalender from './components/MisSeasonCalender';

import MisMemoField from './components/MisMemoField';
import MisAlarmField from './components/MisAlarmField';

import SaveButton from '../../../components/Button/SaveButton';
//실제로 데이터를 주고 받을 때를 대비하여 입력받는 props 값들을 미리 지정해놓음
const AddSelfMission = ({picNum, period, missionList, setMissionList}) => {
  const [periodSelected, setPeriodSelected] = useState(0); //기존으로 설정된 미션종류 = 한주 미션, 이후에 period를 받게 되면 0 대신 period를 받을 예정

  //타이틀은 아무런 입력이 없으면 ''상태
  const [misTitle, setMisTitle] = useState('');
  //타이틀에 아무것도 입력되어 있지 않을 때 상태값 true
  const [isNullTitle, setIsNullTitle] = useState(true);
  //타이틀에 값이 입력된 경우 하단의 save버튼 활성화 체크를 위한 상태값
  const [buttonDisabled, setButtonDisable] = useState(true);

  const [misMemo, setMisMemo] = useState(''); // isMisSelf 값은 true
  const [memoSaveBtnDisabled, setMemoSaveBtnDisabled] = useState(true);

  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const [misAlarmStop, setMisAlarmStop] = useState(new Date());
  const [misAlarmStart, setMisAlarmStart] = useState(new Date());

  const [misAlarmStopTime, setMisAlarmStopTime] = useState('');
  const [misAlarmStartTime, setMisAlarmStartTime] = useState('');
  //알람 시간 세팅할 때 어떤 변수가 필요한 지 몰라서 종류별로 만들어 놓음
  //예를 들어 time 하나만으로도 time.hour, time.minute을 할 수 있는 건지 아니면 별도로 아예 따로 존재해야하는 지 몰라서 만들어놓음.
  // const [misAlarmTime, setMisAlarmTime] = useState('');

  // const [misAlarmHour, setMisAlarmHour] = useState('');
  // const [misAlarmMinute, setMisAlarmMinute] = useState('');

  const checkIsTitleNull = misTitle => {
    return !misTitle;
  }; //타이틀이 비어있는지 여부 체크 비어있으면 return 했을 때 false 이므로 비어있는 경우 true가 리턴 되도록 함

  return (
    <SafeAreaView style={styles.container}>
      {/* 스크롤은 하단의 저장버튼 제외하고 적용함 */}
      <ScrollView>
        {/* 미션 타이틀 입력 받는 모듈 */}
        <MisTitleInput
          misTitle={misTitle}
          setMisTitle={setMisTitle}
          setButtonDisable={setButtonDisable}
          isNullTitle={isNullTitle}
          setIsNullTitle={setIsNullTitle}></MisTitleInput>

        {/* 미션 타이틀 하단에 있는 미션 종류 선택 버튼 3가지 */}
        <View style={styles.periodButtonContainer}>
          <MisPeriodSelectButton
            buttontext={'한주'}
            selectedId={0}
            periodSelected={periodSelected}
            setPeriodSelected={setPeriodSelected}></MisPeriodSelectButton>
          <MisPeriodSelectButton
            buttontext={'한달'}
            selectedId={1}
            periodSelected={periodSelected}
            setPeriodSelected={setPeriodSelected}></MisPeriodSelectButton>
          <MisPeriodSelectButton
            buttontext={'계절'}
            selectedId={2}
            periodSelected={periodSelected}
            setPeriodSelected={setPeriodSelected}></MisPeriodSelectButton>
        </View>
        {/* 선택된 미션 종류에 따라 보여지는 캘린더 종류를 다르게 함 */}
        {periodSelected == 0 && <MisWeekCalender />}
        {periodSelected == 1 && <MisMonthCalender />}
        {periodSelected == 2 && <MisSeasonCalender />}

        <View style={styles.separator}></View>

        {/* 메모 입력 받는 모듈 */}
        <MisMemoField
          misMemo={misMemo}
          setMisMemo={setMisMemo}
          memoSaveBtnDisabled={memoSaveBtnDisabled}
          setMemoSaveBtnDisabled={setMemoSaveBtnDisabled}
        />

        <View style={styles.separator}></View>

        {/* 알람 on/off 여부 및 알람 설정하는 모듈 */}
        <MisAlarmField
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
        />

        <View style={styles.separator}></View>
      </ScrollView>

      {/* 미션 타이틀의 길이값 여부에 따라 활성화 되는 저장 버튼 */}
      <SaveButton
        title="저장"
        value={misTitle}
        setValueIsNotValid={setIsNullTitle}
        checkFunction={checkIsTitleNull}
        buttonDisabled={buttonDisabled}
        setButtonDisable={setButtonDisable}
        // navigation={navigation}
      ></SaveButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20,
  },
  periodButtonContainer: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1.7,
    borderBottomColor: '#C5C5C7',
  },
});

export default AddSelfMission;
