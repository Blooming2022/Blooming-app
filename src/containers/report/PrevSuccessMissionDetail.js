import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {deletePrevSuccessMis} from '../../service/missionServices';
import usePrevMissionChanged from '../../context/hook/usePrevMissionChanged';
import DeleteHeader from '../../components/Header/DeleteHeader';
import DeleteModal from '../../components/Modal/DeleteModal';
import MissionTitleBox from '../../components/Text/MissionTitleBox';
import MisDetailMemo from '../../containers/mission/detail/components/MisDetailMemo';
import PrevMisDetailReview from './components/PrevMisDetailReview';
import MisPeriodText from '../../components/Text/MisPeriodText';

const PrevSuccessMissionDetail = ({route}) => {
  const mission = route.params.mission;
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const {isPrevMissionChanged, setIsPrevMissionChanged} = usePrevMissionChanged();

  const navigation = useNavigation();
  const isMemoExist = mission.misMemo !== '';

  const deletePrevMission = () => {
    const delMisInfo = {
      misID: mission.id,
      hasReview: mission.hasReview,
    };
    deletePrevSuccessMis(delMisInfo);
    setIsPrevMissionChanged(!isPrevMissionChanged);
    navigation.navigate('PrevSuccessMissionList');
  };

  return (
    <>
      <DeleteHeader
        navigation={navigation}
        setIsDelModalVisible={setIsDelModalVisible}></DeleteHeader>
      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isDelModalVisible}
          setIsModalVisible={setIsDelModalVisible}
          deleteFunction={deletePrevMission}></DeleteModal>
        <MisPeriodText misPeriod={mission.misPeriod}></MisPeriodText>
        <MissionTitleBox misTitle={mission.misTitle}></MissionTitleBox>
        {isMemoExist && <MisDetailMemo misMemo={mission.misMemo}></MisDetailMemo>}
        <PrevMisDetailReview navigation={navigation} mission={mission}></PrevMisDetailReview>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  periodBoxWrapper: {
    alignItems: 'flex-end',
  },
  periodBox: {
    width: 57,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
  },
  misPeriod: {
    fontSize: 14,
    color: '#888888',
  },
});

export default PrevSuccessMissionDetail;
