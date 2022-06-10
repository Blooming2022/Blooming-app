import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const MissionAddModal = ({
  isModalVisible,
  setIsModalVisible,
  picNum,
  misPeriod,
  missionList,
  setMissionList,
  navigation,
}) => {
  const addSelfMission = () => {
    navigation.navigate('MissionCreate', {misInfo : {picNum : picNum, misPeriod : misPeriod, isMisSelf: true}})
    setIsModalVisible(false);
  };
  const addRandomMission = () => {
    const newInfo = {
      title: '샐러드/야식/운동',
      picNum: picNum,
      type: 1,
      period: 1, // 한달 기준으로 임시 생성. 한주, 계절미션 동작 확인 시 해당 필드의 숫자 바꿀 것.
      misMemo: '',
      isSuccess: false,
    };
    setMissionList([...missionList, newInfo]);
    setIsModalVisible(false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      style={styles.modal}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MissionCreate');
            addSelfMission(picNum);
          }}>
          <Text style={styles.modalText}>셀프미션 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addRandomMission(picNum);
          }}>
          <Text style={styles.modalText}>랜덤미션 추가</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    width: 250,
    height: 130,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 28,
  },
  modalText: {
    fontSize: 16,
    color: '#242424',
  },
});

export default MissionAddModal;
