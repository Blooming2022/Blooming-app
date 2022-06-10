import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisPeriodSelectBtn from './components/MisPeriodSelectBtn';
import MisTitleInput from './components/MisTitleInput';
import SelectMisWeek from './components/SelectMisWeek';
import SelectMisMonth from './components/SelectMisMonth';
import SelectMisSeason from './components/SelectMisSeason';
import MisMemoField from './components/MisMemoField';
import {createCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';

const MissionCreate = ({route}) => {
  const misInfo = route.params.misInfo;
  const [period, setPeriod] = useState(misInfo.period);
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [misWeekStart, setMisWeekStart] = useState(''); // timestamp
  const [misWeekEnd, setMisWeekEnd] = useState(''); // timestamp
  const [misMonth, setMisMonth] = useState(''); // 0 is January
  const [misSeason, setMisSeason] = useState(0); // 0 is Spring
  const [isValid, setIsValid] = useState(false);
  let isMisSelfText = misInfo.isMisSelf ? '셀프' : '랜덤';
  const [misTime, setMisTime] = useState([]); // Different values depending on the period
  const navigation = useNavigation();

  useEffect(() => {
    if (period === 0) setMisTime([misWeekStart, misWeekEnd]);
    else if (period === 1) setMisTime(misMonth);
    else setMisTime(misSeason);
  }, [period]);

  useEffect(() => {
    if (title !== '') {
      setIsValid(true);
    } else setIsValid(false);
  }, [title]);

  const createMission = () => {
    let mission = {
      misTitle: title,
      misPeriod: period,
      picNum: misInfo.picNum,
      isSuccess: false,
      successDate: null,
      isMisSelf: misInfo.isMisSelf,
      misTime: misTime,
      misMemo: memo,
      hasReview: false,
    };
    createCurrentMis(mission);
    navigation.navigate('MissionDetail', {mission: mission});
  };

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title={isMisSelfText + ' 미션 추가'}
        isValid={isValid}
        completeFunction={createMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisTitleInput setMisTitle={setTitle}></MisTitleInput>
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
        {period == 0 && (
          <SelectMisWeek setMisWeekStart={setMisWeekStart} setMisWeekEnd={setMisWeekEnd} />
        )}
        {period == 1 && <SelectMisMonth setMisMonth={setMisMonth} />}
        {period == 2 && <SelectMisSeason setMisSeason={setMisSeason} />}
        <View style={styles.separator}></View>
        <MisMemoField setMemo={setMemo} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
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
