import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisTitleInput from './components/MisTitleInput';
import MisMemoField from './components/MisMemoField';
import MisPeriodText from '../../../components/Text/MisPeriodText';
import {createCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';

const MissionCreate = ({route}) => {
  const misInfo = route.params.misInfo;
  const [misPeriod, setMisPeriod] = useState(misInfo.misPeriod);
  const [misTitle, setMisTitle] = useState('');
  const [misMemo, setMisMemo] = useState('');
  const [isValid, setIsValid] = useState(false);
  let isMisSelfText = misInfo.isMisSelf ? '셀프' : '랜덤';
  const navigation = useNavigation();

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
      misSuccessDate: null,
      isMisSelf: misInfo.isMisSelf,
      misMemo: misMemo,
      hasReview: false,
    };
    createCurrentMis(mission); // 여기서 id를 포함한 미션 정보를 받아오고 싶습니다!
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
        <MisPeriodText misPeriod={misPeriod}></MisPeriodText>
        <MisTitleInput misTitle={misTitle} setMisTitle={setMisTitle}></MisTitleInput>
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
