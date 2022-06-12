import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import MisTitleInput from '../create/components/MisTitleInput';
import MisMemoField from '../create/components/MisMemoField';
import {updateCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import MisPeriodText from '../../../components/Text/MisPeriodText';

const MissionUpdate = ({route}) => {
  const initialMisInfo = route.params.mission;
  let updateInfo = {};
  const [misTitle, setTitle] = useState(initialMisInfo.misTitle);
  const [misMemo, setMisMemo] = useState(initialMisInfo.misMemo);
  const [isValid, setIsValid] = useState(false);
  let isMisSelfText = initialMisInfo.isMisSelf ? '셀프' : '랜덤';
  const navigation = useNavigation();

  useEffect(() => {
    if (misTitle !== '') {
      setIsValid(true);
    } else setIsValid(false);
  }, [misTitle]);

  const updateMission = () => {
    if(initialMisInfo.misTitle !== misTitle) updateInfo.misTitle = misTitle;
    // if(initialMisInfo.misPeriod !== misPeriod) updateInfo.misPeriod = misPeriod; this is issue...
    // if(initialMisInfo.picNum !== picNum) updateInfo.picNum = picNum; this is issue...
    // if(initialMisInfo.misTime !== misTime) updateInfo.misTime = misTime; this is issue...
    if(initialMisInfo.misMemo !== misMemo) updateInfo.misMemo = misMemo;
    let updateMisInfo = {
      misID : initialMisInfo.id,
      updateInfo: updateInfo
    };
    updateCurrentMis(updateMisInfo);
    let mission = {
      id : initialMisInfo.id,
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
    color: '#ffffff'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C7',
  },
});

export default MissionUpdate;
