import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReviewList from './components/ReviewList';
import {getKSTTime} from './../../../service/commonServices';

const ReviewSeason = () => {
  const date = getKSTTime();
  const [reviewList, setReviewList] = useState([
    {
      id: 0,
      misPeriod: 1,
      misTitle: '물마시기',
      revContent: 'water is good for health',
      misDate: date,
      revImg: 'https://t1.daumcdn.net/cfile/tistory/99B5EC335982A2BF18',
    },
  ]);
  return (
    <View style={styles.container}>
      <ReviewList reviewList={reviewList}></ReviewList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default ReviewSeason;
