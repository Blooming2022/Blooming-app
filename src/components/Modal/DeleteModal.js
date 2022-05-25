import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const DeleteModal = ({isModalVisible, setIsModalVisible, deleteFunction}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      style={styles.modal}>
      <View style={styles.modalView}>
        <Text style={[styles.modalText, styles.title]}>정말 삭제하시겠습니까?</Text>
        <Text style={[styles.modalText, styles.subTitle]}>삭제 후 내용 복구가 불가능합니다.</Text>
        <View style={styles.optionBox}>
          <TouchableOpacity style={styles.option} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={deleteFunction}>
            <Text style={[styles.modalText, styles.red]}>삭제</Text>
          </TouchableOpacity>
        </View>
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
    height: 160,
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#242424',
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subTitle: {
    fontSize: 13,
  },
  optionBox: {
    flexDirection: 'row',
    paddingTop: 25,
  },
  option: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  red: {
    fontWeight: 'bold',
    color: '#F54D3F',
  },
});

export default DeleteModal;
