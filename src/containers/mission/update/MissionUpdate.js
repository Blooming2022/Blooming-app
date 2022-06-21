import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisTitleInput from '../create/components/MisTitleInput';
import MisMemoField from '../create/components/MisMemoField';
import {updateCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import MisPeriodText from '../../../components/Text/MisPeriodText';

const MissionUpdate = ({route}) => {
  const initialMisInfo = route.params.mission;
  const isInitialMount = useRef(true); // To disable the complete button on the first rendering
  const [misPeriod, setMisPeriod] = useState(initialMisInfo.misPeriod);
  const [misTitle, setTitle] = useState(initialMisInfo.misTitle);
  const [misMemo, setMisMemo] = useState(initialMisInfo.misMemo);
  const [isValid, setIsValid] = useState(false); // Conditions for changing color of complete buttons
  let isMisSelfText = initialMisInfo.isMisSelf ? '셀프' : '랜덤';
  const navigation = useNavigation();

  const updateMission = () => {
    let updateInfo = {};
    if (initialMisInfo.misTitle !== misTitle) updateInfo.misTitle = misTitle;
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
      isSuccess: initialMisInfo.isSuccess,
      misSuccessDate: initialMisInfo.misSuccessDate,
      isMisSelf: initialMisInfo.isMisSelf,
      misMemo: misMemo,
      hasReview: initialMisInfo.hasReview,
    };
    navigation.navigate('MissionDetail', {mission: mission});
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (misTitle == '') setIsValid(false); // an essential condition
      else if (initialMisInfo.misTitle !== misTitle) setIsValid(true);
      else if (initialMisInfo.misMemo !== misMemo) setIsValid(true);
      else setIsValid(false); // If there is no change in the misTitle, misMemo
    }
  }, [misTitle, misMemo]);

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title={isMisSelfText + ' 미션 편집'}
        isValid={isValid}
        completeFunction={updateMission}></CompleteHeader>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <MisPeriodText misPeriod={initialMisInfo.misPeriod}></MisPeriodText>
        <MisTitleInput misTitle={misTitle} setMisTitle={setTitle}></MisTitleInput>
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
    width: 55,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 0,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#242424',
  },
  periodButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C7',
  },
});

export default MissionUpdate;
