import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReviewList from './components/ReviewList';
import {getRevList} from '../../../service/reviewServices';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const ReviewWeek = () => {
  const [reviewList, setReviewList] = useState([]);
  const {isReviewChanged} = useReviewChanged();

  useEffect(() => {
    getRevList(0).then(reviewList => setReviewList(reviewList));
  }, [isReviewChanged]);

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

export default ReviewWeek;
