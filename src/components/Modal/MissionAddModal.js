import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const MissionAddModal = ({
  isModalVisible,
  setIsModalVisible,
  picNum,
  period, //어디서 미션 추가하는 지 받기 0,1,2 한주 한달 계절
  missionList,
  setMissionList,
}) => {
  const addRandomMission = () => {
    const newInfo = {
      title: '샐러드/운동',
      picNum: picNum,
      type: 1,
      period: period, //임의 값에서 period로 수정
      misMemo: '',
      isSuccess: false, //추가한 당시에는 무조건 false
    };
    setMissionList([...missionList, newInfo]);
    setIsModalVisible(false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      style={styles.modal}>
      <View style={styles.separator} />
      <View style={styles.modalView}>
        <TouchableOpacity
          buttontext="셀프"
          background="F6C9CD"
          onPress={() => {
            // navigation.navigate('MissionStackNavigator', {
            //   screen: 'addSelfMission',
            //   params: {
            //     picNum: picNum,
            //     period: period,
            //     setMissionList: setMissionList,
            //     missionList: missionList,
            //   },
            // });
          }}>
          <Text style={styles.modalText}>셀프미션 추가</Text>
        </TouchableOpacity>

        <TouchableOpacity
          buttontext="랜덤"
          background="8ED6DA"
          onPress={() => {
            addRandomMission(picNum, period);
            setIsModalVisible(false);
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
    color: '#000000',
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default MissionAddModal;
