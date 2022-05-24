import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

const PhotoModal = ({
  review,
  setReview,
  isModalVisible,
  setModalVisible,
  isImageExist,
  setIsImageExist,
}) => {
  const takePhotoFromCamera = () => {
    setModalVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperToolbarTitle: '',
      cropperActiveWidgetColor: '#8752FF',
    })
      .then(image => {
        setReview({...review, ...{revImg: image.path}});
        setIsImageExist(!isImageExist);
        console.log(review);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  const choosePhotoFromLibrary = () => {
    console.log(review);
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperToolbarTitle: '',
      cropperActiveWidgetColor: '#8752FF',
    })
      .then(image => {
        setReview({...review, ...{revImg: image.path}});
        setIsImageExist(!isImageExist);
        console.log(review);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      backdropOpacity={0.5}
      style={styles.modal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropTransitionInTiming={0}
      hideModalContentWhileAnimating={true}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={takePhotoFromCamera}>
          <Text style={styles.modalText}>사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={choosePhotoFromLibrary}>
          <Text style={styles.modalText}>앨범에서 사진 선택</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalView: {
    width: '75%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },
  modalText: {
    textAlign: 'center',
    color: '#242424',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});

export default PhotoModal;
