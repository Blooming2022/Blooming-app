import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import DeleteModal from '../../../components/Modal/DeleteModal';

const MissionDetail = ({route, navigation}) => {
  const mission = route.params.mission;
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 아래의 두 함수는 서버 연동 후 변경할 예정입니다. 지금은 화면 흐름만 구현했어요.
  let misPeriodText;
  if (mission.period === 0) {
    misPeriodText = '한주';
  } else if (mission.Period === 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }
  const goToMissionUpdate = () => {
    navigation.navigate('missionUpdate', {mission: mission});
  };
  const deleteMission = () => {
    navigation.navigate('MainTab', {screen: 'missionHome'});
  };

  return (
    <>
      <DetailHeader
        navigation={navigation}
        updateFunction={goToMissionUpdate}
        setIsModalVisible={setIsModalVisible}></DetailHeader>
      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          deleteFunction={deleteMission}></DeleteModal>
        <Text>{misPeriodText}</Text>
        <Text>{mission.memo}</Text>
        <Text>후기</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('ReviewCreate', {mission : mission})}>
          <Image source={require('../../../assets/images/addReviewBtnDisable.png')}></Image>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },

});

export default MissionDetail;
