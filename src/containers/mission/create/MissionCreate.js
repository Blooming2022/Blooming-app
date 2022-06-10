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
  const [misPeriod, setMisPeriod] = useState(misInfo.misPeriod);
  const [misTitle, setMisTitle] = useState('');
  const [misMemo, setMisMemo] = useState('');
  const [misWeekStart, setMisWeekStart] = useState(''); // timestamp
  const [misWeekEnd, setMisWeekEnd] = useState(''); // timestamp
  const [misMonth, setMisMonth] = useState(''); // 0 is January
  const [misSeason, setMisSeason] = useState(0); // 0 is Spring
  const [isValid, setIsValid] = useState(false);
  let isMisSelfText = misInfo.isMisSelf ? '셀프' : '랜덤';
  const [misTime, setMisTime] = useState([]); // Different values depending on the misPeriod
  const navigation = useNavigation();

  useEffect(() => {
    if (misPeriod === 0) setMisTime([misWeekStart, misWeekEnd]);
    else if (misPeriod === 1) setMisTime(misMonth);
    else setMisTime(misSeason);
  }, [misPeriod]);

  useEffect(() => {
    if (misTitle !== '') {
      setIsValid(true);
    } else setIsValid(false);
  }, [misTitle]);

  const createMission = () => {
    let mission = {
      misTitle: misTitle,
      misPeriod: misPeriod,
      picNum: misInfo.picNum,
      isSuccess: false,
      successDate: null,
      isMisSelf: misInfo.isMisSelf,
      misTime: misTime,
      misMemo: misMemo,
      hasReview: false,
    };
    createCurrentMis(mission); // 여기서 id를 포함한 미션 정보를 받아오고 싶은데 비동기 처리를 해도 null입니당...back에서 promise가 제대로 안 넘어오네요.
    navigation.navigate('MissionDetail', {mission: mission}); // id를 받지 못했기에 여기서 이동한 디테일 페이지에서는 수정 시 오류가 납니다.
  };

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title={isMisSelfText + ' 미션 추가'}
        isValid={isValid}
        completeFunction={createMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisTitleInput misTitle={misTitle} setMisTitle={setMisTitle}></MisTitleInput>
        <View style={styles.periodButtonContainer}>
          <MisPeriodSelectBtn
            buttontext={'한주'}
            selectedId={0}
            misPeriod={misPeriod}
            setMisPeriod={setMisPeriod}></MisPeriodSelectBtn>
          <MisPeriodSelectBtn
            buttontext={'한달'}
            selectedId={1}
            misPeriod={misPeriod}
            setMisPeriod={setMisPeriod}></MisPeriodSelectBtn>
          <MisPeriodSelectBtn
            buttontext={'계절'}
            selectedId={2}
            misPeriod={misPeriod}
            setMisPeriod={setMisPeriod}></MisPeriodSelectBtn>
        </View>
        {misPeriod == 0 && (
          <SelectMisWeek setMisWeekStart={setMisWeekStart} setMisWeekEnd={setMisWeekEnd} />
        )}
        {misPeriod == 1 && <SelectMisMonth setMisMonth={setMisMonth} />}
        {misPeriod == 2 && <SelectMisSeason setMisSeason={setMisSeason} />}
        <View style={styles.separator}></View>
        <MisMemoField misMemo={misMemo} setMisMemo={setMisMemo} />
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
