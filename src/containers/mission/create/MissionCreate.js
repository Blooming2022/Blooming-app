import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisTitleInput from './components/MisTitleInput';
import MisMemoField from './components/MisMemoField';
import MisPeriodText from '../../../components/Text/MisPeriodText';
import {createCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import RandomMisTitle from './components/RandomMisTitle';
import useMissionChanged from '../../../context/hook/useMissionChanged';

const MissionCreate = ({route}) => {
  const misInfo = route.params.misInfo;
  const [misPeriod, setMisPeriod] = useState(misInfo.misPeriod);
  const [misTitle, setMisTitle] = useState('');
  const [misMemo, setMisMemo] = useState('');
  const [isValid, setIsValid] = useState(false);
  let isMisSelfText = misInfo.isMisSelf ? '셀프' : '랜덤';
  const navigation = useNavigation();
  const {isMissionChanged, setIsMissionChanged} = useMissionChanged();

  useEffect(() => {
    if (misTitle !== '') {
      setIsValid(true);
    } else setIsValid(false);
  }, [misTitle]);

  useEffect(() => {
    // if randomMission, set misTitle
    if (!misInfo.isMisSelf) {
      const result1 = misInfo.misTitle.result1;
      const result2 = misInfo.misTitle.result2;
      const randomMisTitle = `${result1} / ${result2}`;
      setMisTitle(randomMisTitle);
    }
  }, []);

  const createMission = async () => {
    let mission = {
      misTitle: misTitle,
      misPeriod: misPeriod,
      picNum: misInfo.picNum,
      isSuccess: false,
      misSuccessDate: null,
      isMisSelf: misInfo.isMisSelf,
      misMemo: misMemo,
      hasReview: false,
    };
    const result = await createCurrentMis(mission);
    setIsMissionChanged(!isMissionChanged);
    navigation.navigate('MissionDetail', {mission: result});
  };

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title={isMisSelfText + ' 미션 추가'}
        isValid={isValid}
        completeFunction={createMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisPeriodText misPeriod={misPeriod}></MisPeriodText>
        {misInfo.isMisSelf ? (
          <MisTitleInput misTitle={misTitle} setMisTitle={setMisTitle}></MisTitleInput>
        ) : (
          <RandomMisTitle misTitle={misTitle}></RandomMisTitle>
        )}
        <MisMemoField misMemo={misMemo} setMisMemo={setMisMemo} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
