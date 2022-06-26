import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getRevById} from '../../../service/reviewServices';

const PrevMisDetailReview = ({navigation, mission}) => {
  const hasReview = mission.hasReview;
  let review;

  useEffect(() => {
    async function fetchData() {
      review = await getRevById(mission.id);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.reviewBox}>
      <View style={styles.reviewTextBox}>
        <Text style={styles.reviewText}>후기</Text>
      </View>
      {hasReview ? (
        <TouchableOpacity
          style={styles.addReviewBtn}
          onPress={() => navigation.navigate('ReviewDetail', {review: review})}>
          <Image source={require('../../../assets/images/goReview.png')}></Image>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addReviewBtn}
          onPress={() => navigation.navigate('ReviewCreate', {mission: mission, isOutdated: true})}>
          <Image
            style={styles.ableBtnImg}
            source={require('../../../assets/images/addReviewBtnDisable.png')}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  reviewTextBox: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 16,
    color: '#242424',
  },
  infoBtn: {
    marginHorizontal: 8,
  },
  ableBtnImg: {
    tintColor: '#242424',
  },
  addReviewBtn: {
    marginHorizontal: 10,
  },
});

export default PrevMisDetailReview;
