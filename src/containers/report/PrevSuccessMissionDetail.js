import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import DeleteHeader from '../../components/Header/DeleteHeader';

import DeleteModal from '../../components/Modal/DeleteModal';
import MissionTitleBox from '../../components/Text/MissionTitleBox';
import {deletePrevSuccessMis} from '../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import InfoModal from '../../components/Modal/InfoModal';
import MisDetailMemo from '../../containers/mission/detail/components/MisDetailMemo';
import PrevMisDetailReview from './components/PrevMisDetailReview';
import MisPeriodText from '../../components/Text/MisPeriodText';

const PrevSuccessMissionDetail = ({route}) => {
  const mission = route.params.mission;
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(false); // Conditions for changing color of complete buttons

  let isMisSelfText = mission.isMisSelf ? '셀프' : '랜덤';
  const navigation = useNavigation();
  const isMemoExist = mission.misMemo !== '';

  const deleteMission = () => {
    const delMisInfo = {
      misID: mission.id,
      hasReview: mission.hasReview,
    };
    deletePrevSuccessMis(delMisInfo);
    navigation.navigate('PrevSuccessMissionList');
  };
  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };

  const updateMission = () => {
    let updateInfo = {};
    let updateMisInfo = {
      misID: mission.id,
      updateInfo: updateInfo,
    };
    updateCurrentMis(updateMisInfo);
    let mission = {
      id: mission.id,
      misTitle: mission.misTitle,
      misPeriod: mission.misPeriod,
      picNum: mission.picNum,
      isSuccess: mission.isSuccess,
      misSuccessDate: mission.misSuccessDate,
      isMisSelf: mission.isMisSelf,
      misMemo: mission.misMemo,
      hasReview: mission.hasReview,
    };
    navigation.navigate('MissionDetail', {mission: mission});
  };

  const goToMissionUpdate = () => {
    navigation.navigate('MissionUpdate', {mission: mission});
  };
  // useEffect(() => {
  //   if (mission.current) {
  //     mission.current = false;
  //   } else {
  //     if (misTitle == '') setIsValid(false); // an essential condition
  //     else if (mission.misTitle !== misTitle) setIsValid(true);
  //     else if (mission.misMemo !== misMemo) setIsValid(true);
  //     else setIsValid(false); // If there is no change in the misTitle, misMemo
  //   }
  // }, [misTitle, misMemo]);

  return (
    <>
      <DeleteHeader
        navigation={navigation}
        deleteFunction={goToMissionUpdate}
        setIsModalVisible={setIsDelModalVisible}
        from="report"></DeleteHeader>

      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isDelModalVisible}
          setIsModalVisible={setIsDelModalVisible}
          deleteFunction={deleteMission}></DeleteModal>
        <InfoModal
          isModalVisible={isInfoModalVisible}
          setIsModalVisible={setIsInfoModalVisible}
          title="안내"
          text1="이미 성공한 미션인 경우"
          text2="후기만 추가할 수 있습니다."></InfoModal>
        <MisPeriodText misPeriod={mission.misPeriod}></MisPeriodText>
        <MissionTitleBox misTitle={mission.misTitle}></MissionTitleBox>
        {isMemoExist && <MisDetailMemo misMemo={mission.misMemo}></MisDetailMemo>}
        <PrevMisDetailReview
          showInfoModal={showInfoModal}
          navigation={navigation}
          mission={mission}></PrevMisDetailReview>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  periodBoxWrapper: {
    alignItems: 'flex-end',
  },
  periodBox: {
    width: 57,
    height: 37,
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  misPeriod: {
    fontSize: 14,
    color: '#888888',
  },
});

export default PrevSuccessMissionDetail;
