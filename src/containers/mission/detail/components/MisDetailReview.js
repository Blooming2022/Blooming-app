import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MisDetailReview = ({showInfoModal, navigation, mission}) => {
  const hasReview = mission.hasReview;

  return (
    <View style={styles.reviewBox}>
      <View style={styles.reviewTextBox}>
        <Text style={styles.reviewText}>후기</Text>
        <TouchableOpacity style={styles.infoBtn} onPress={showInfoModal}>
          <Image source={require('../../../../assets/images/infoBtn.png')}></Image>
        </TouchableOpacity>
      </View>
      {hasReview ? (
        <TouchableOpacity
          style={styles.addReviewBtn}
          onPress={() => navigation.navigate('ReviewCreate', {mission: mission})}>
          <Image
            style={styles.ableBtnImg}
            source={require('../../../../assets/images/addReviewBtnDisable.png')}></Image>
        </TouchableOpacity>
      ) : (
        <Image source={require('../../../../assets/images/addReviewBtnDisable.png')}></Image>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  reviewTextBox: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 16,
    color: '#242424',
  },
  infoBtn: {
    paddingHorizontal: 8,
  },
  ableBtnImg: {
    tintColor: '#242424',
  },
  addReviewBtn: {
    paddingHorizontal: 10,
  },
});

export default MisDetailReview;
