import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import DeleteModal from '../../../components/Modal/DeleteModal';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import {deleteCurrentMis} from '../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import InfoModal from '../../../components/Modal/InfoModal';

const MissionDetail = ({route}) => {
  const mission = route.params.mission;
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const navigation = useNavigation();
  const isMemoExist = mission.misMemo !== '';

  let misPeriodText;
  if (mission.misPeriod == 0) {
    misPeriodText = '한주';
  } else if (mission.misPeriod == 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }
  const goToMissionUpdate = () => {
    navigation.navigate('MissionUpdate', {mission: mission});
  };
  const deleteMission = () => {
    const delMisInfo = {
      misID: mission.id,
      hasReview: mission.hasReview,
    };
    deleteCurrentMis(delMisInfo);
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
        <View style={styles.periodBoxWrapper}>
          <View style={styles.periodBox}>
            <Text style={styles.misPeriod}>{misPeriodText}</Text>
          </View>
        </View>
        <MissionTitleBox misTitle={mission.misTitle}></MissionTitleBox>
        {isMemoExist && (
          <>
            <View style={styles.memoBox}>
              <Image
                style={styles.memoIcon}
                source={require('../../../assets/images/memo.png')}></Image>
              <Text style={styles.memoText}>{mission.misMemo}</Text>
            </View>
            <View style={styles.separator}></View>
          </>
        )}
        <View style={styles.reviewBox}>
          <View style={styles.reviewTextBox}>
            <Text style={styles.reviewText}>후기</Text>
            <TouchableOpacity style={styles.infoBtn} onPress={showInfoModal}>
              <Image source={require('../../../assets/images/infoBtn.png')}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ReviewCreate', {mission: mission})}>
            <Image source={require('../../../assets/images/addReviewBtnDisable.png')}></Image>
          </TouchableOpacity>
        </View>
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
  memoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  memoIcon: {
    marginRight: 15,
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#C5C5C7',
    marginBottom: 15,
  },
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  reviewTextBox: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 16,
    color: '#242424',
  },
  infoBtn: {
    paddingHorizontal: 8,
  },
});

export default MissionDetail;
