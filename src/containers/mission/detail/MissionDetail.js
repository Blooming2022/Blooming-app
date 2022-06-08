import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import DeleteModal from '../../../components/Modal/DeleteModal';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import { deleteCurrentMis } from '../../../service/missionServices';
import { useNavigation } from '@react-navigation/native';

const MissionDetail = ({route}) => {
  const mission = route.params.mission;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

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
      misID : mission.id,
      hasReview : mission.hasReview
    }
    deleteCurrentMis(delMisInfo);
    navigation.navigate('MainTab', {screen: 'missionHome'});
  };

  return (
    <>
      <DetailHeader
        navigation={navigation}
        updateFunction={goToMissionUpdate}
        setIsModalVisible={setIsModalVisible}
        from="mission"></DetailHeader>
      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          deleteFunction={deleteMission}></DeleteModal>
        <View style={styles.periodBoxWrapper}>
          <View style={styles.periodBox}>
            <Text style={styles.misPeriod}>{misPeriodText}</Text>
          </View>
        </View>
        <MissionTitleBox misTitle={mission.misTitle}></MissionTitleBox>
        <View style={styles.memoBox}>
          <Image style={styles.memoIcon} source={require('../../../assets/images/memo.png')}></Image>
          <Text style={styles.memoText}>{mission.misMemo}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.reviewBox}>
          <View style={styles.reviewTextBox}>
            <Text style={styles.reviewText} >후기</Text>
            <Image source={require('../../../assets/images/infoBtn.png')}></Image>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('ReviewCreate', {mission : mission})}>
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
    alignItems: 'flex-end'
  },
  periodBox: {
    width: 57,
    height: 37,
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
    justifyContent:'center',
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
    paddingBottom: 20
  },
  memoIcon: {
    marginRight: 15
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#C5C5C7',
  },
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  reviewTextBox: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 16,
    color: '#242424',
    marginRight: 8
  }
});

export default MissionDetail;
