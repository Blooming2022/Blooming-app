import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ReviewList from './components/ReviewList';
import {getRevList} from '../../../service/reviewServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const ReviewSeason = () => {
  const [reviewList, setReviewList] = useState([]);
  const {isReviewChanged} = useReviewChanged();
  const {isMissionChanged} = useMissionChanged();

  useEffect(() => {
    getRevList(2).then(reviewList => setReviewList(reviewList));
  }, [isReviewChanged, isMissionChanged]);

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
