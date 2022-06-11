import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisPeriodSelectBtn from '../create/components/MisPeriodSelectBtn';
import MisTitleInput from '../create/components/MisTitleInput';
import SelectMisWeek from '../create/components/SelectMisWeek';
import SelectMisMonth from '../create/components/SelectMisMonth';
import SelectMisSeason from '../create/components/SelectMisSeason';
import MisMemoField from '../create/components/MisMemoField';
import {updateCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';

const MissionUpdate = ({route}) => {
  const initialMisInfo = route.params.mission;
  const isInitialMount = useRef(true); // To disable the complete button on the first rendering
  const [misPeriod, setMisPeriod] = useState(initialMisInfo.misPeriod);
  const [misTitle, setTitle] = useState(initialMisInfo.misTitle);
  const [misMemo, setMisMemo] = useState(initialMisInfo.misMemo);
  const [misWeekStart, setMisWeekStart] = useState(''); // timestamp
  const [misWeekEnd, setMisWeekEnd] = useState(''); // timestamp
  const [misMonth, setMisMonth] = useState(''); // 0 is January
  const [misSeason, setMisSeason] = useState(0); // 0 is Spring
  const [isValid, setIsValid] = useState(false); // Conditions for changing color of complete buttons
  let isMisSelfText = initialMisInfo.isMisSelf ? '셀프' : '랜덤';
  const [misTime, setMisTime] = useState([]); // Different values depending on the misPeriod
  const navigation = useNavigation();

  const updateMission = () => {
    let updateInfo = {};
    if (initialMisInfo.misTitle !== misTitle) updateInfo.misTitle = misTitle;
    // if(initialMisInfo.misPeriod !== misPeriod) updateInfo.misPeriod = misPeriod; this is issue...
    // if(initialMisInfo.picNum !== picNum) updateInfo.picNum = picNum; this is issue...
    // if(initialMisInfo.misTime !== misTime) updateInfo.misTime = misTime; this is issue...
    if (initialMisInfo.misMemo !== misMemo) updateInfo.misMemo = misMemo;
    let updateMisInfo = {
      misID: initialMisInfo.id,
      updateInfo: updateInfo,
    };
    updateCurrentMis(updateMisInfo);
    let mission = {
      id: initialMisInfo.id,
      misTitle: misTitle,
      misPeriod: misPeriod,
      picNum: initialMisInfo.picNum,
      isSuccess: false,
      successDate: null,
      isMisSelf: initialMisInfo.isMisSelf,
      misTime: misTime,
      misMemo: misMemo,
      hasReview: false,
    };
    navigation.navigate('MissionDetail', {mission: mission});
  };

  useEffect(() => {
    if (misPeriod === 0) setMisTime([misWeekStart, misWeekEnd]);
    else if (misPeriod === 1) setMisTime(misMonth);
    else setMisTime(misSeason);
  }, [misPeriod]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (misTitle !== '') setIsValid(true);
      else setIsValid(false);
    }
  }, [misTitle]);

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title={isMisSelfText + ' 미션 편집'}
        isValid={isValid}
        completeFunction={updateMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisTitleInput misTitle={misTitle} setMisTitle={setTitle}></MisTitleInput>
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

export default MissionUpdate;
