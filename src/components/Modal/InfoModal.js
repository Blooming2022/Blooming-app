import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const InfoModal = ({isModalVisible, setIsModalVisible, title, text1, text2}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={[styles.modalText, styles.title]}>{title}</Text>
        <Text style={[styles.modalText, styles.text]}>{text1}</Text>
        <Text style={[styles.modalText, styles.text]}>{text2}</Text>
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
  modalContent: {
    backgroundColor: '#ffffff',
    width: 250,
    height: 160,
    borderRadius: 10,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#242424',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    lineHeight: 25,
  },
});

export default InfoModal;
