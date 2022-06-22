import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import DeleteModal from '../../../components/Modal/DeleteModal';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import {deleteCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import InfoModal from '../../../components/Modal/InfoModal';
import MisDetailMemo from './components/MisDetailMemo';
import MisDetailReview from './components/MisDetailReview';
import MisPeriodText from '../../../components/Text/MisPeriodText';
import useMissionChanged from '../../../context/hook/useMissionChanged';

const MissionDetail = ({route}) => {
  const mission = route.params.mission;
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const navigation = useNavigation();
  const isMemoExist = mission.misMemo !== '';
  const {isMissionChanged, setIsMissionChanged} = useMissionChanged();

  const goToMissionUpdate = () => {
    navigation.navigate('MissionUpdate', {mission: mission});
  };
  const deleteMission = () => {
    const delMisInfo = {
      misID: mission.id,
      hasReview: mission.hasReview,
    };
    deleteCurrentMis(delMisInfo);
    setIsMissionChanged(!isMissionChanged);
    navigation.navigate('MainTab', {screen: 'missionHome'});
  };
  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };

  return (
    <>
      <DetailHeader
        navigation={navigation}
        updateFunction={goToMissionUpdate}
        setIsModalVisible={setIsDelModalVisible}
        from="mission"></DetailHeader>
      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isDelModalVisible}
          setIsModalVisible={setIsDelModalVisible}
          deleteFunction={deleteMission}></DeleteModal>
        <InfoModal
          isModalVisible={isInfoModalVisible}
          setIsModalVisible={setIsInfoModalVisible}
          title="안내"
          text1="후기는 성공한 미션인 경우"
          text2="생성 가능합니다"></InfoModal>
        <MisPeriodText misPeriod={mission.misPeriod}></MisPeriodText>
        <MissionTitleBox misTitle={mission.misTitle}></MissionTitleBox>
        {isMemoExist && <MisDetailMemo misMemo={mission.misMemo}></MisDetailMemo>}
        <MisDetailReview
          showInfoModal={showInfoModal}
          navigation={navigation}
          mission={mission}></MisDetailReview>
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

export default MissionDetail;
