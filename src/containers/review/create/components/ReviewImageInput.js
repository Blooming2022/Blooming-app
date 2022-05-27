import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ReviewImageInput = ({isImageExist, revImg, deleteImage, setModalVisible}) => {
  let source;
  revImg == ''
    ? (source = require('../../../../assets/images/addImage.png'))
    : (source = {uri: revImg});

  return (
    <View style={styles.imgBox}>
      {isImageExist ? (
        <View style={styles.border}>
          <Image style={styles.revImg} source={source}></Image>
          <TouchableOpacity onPress={() => deleteImage()}>
            <Image
              style={styles.deleteImgBtn}
              source={require('../../../../assets/images/deleteBtn.png')}></Image>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.revImg}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image style={styles.revImg} source={source}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    width: 111,
    height: 111,
    position: 'relative',
  },
  border: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  revImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    marginBottom: 25,
  },
  deleteImgBtn: {
    position: 'absolute',
    top: -150,
    left: 99,
    width: 24,
    height: 24,
  },
});

export default ReviewImageInput;
