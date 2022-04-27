import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";

const MissionAddModal = ({isModalVisible, setIsModalVisible}) =>
{
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
      <View style={styles.modalView}>
        <TouchableOpacity>
          <Text style={styles.modalText}>랜덤미션 추가</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.modalText}>셀프미션 추가</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create( {
  modal: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalView: {
    backgroundColor:'#ffffff',
    width: 250,
    height: 130,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal:28,
    paddingVertical:28
  },
  modalText: {
    fontSize: 16,
    color:'#000000'
  }
});

export default MissionAddModal;
