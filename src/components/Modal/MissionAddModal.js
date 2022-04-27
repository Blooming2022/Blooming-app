import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";

const MissionAddModal = ({isModalVisible, setIsModalVisible}) =>
{
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)} style={styles.modal}>
      <View style={styles.container}>
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
  container: {
    backgroundColor:'#ffffff',
    width: 250,
    height: 120,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:33
  },
  modalText: {
    fontSize: 16,
    color:'#000000'
  }
});

export default MissionAddModal;