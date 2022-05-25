import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReviewList from './components/ReviewList';
import {getKSTTime} from './../../../service/commonServices';

const ReviewMonth = () => {
  const date = getKSTTime();
  // dummy data. CRUD와 연동 안됨.
  const [reviewList, setReviewList] = useState([
    {
      id: 0,
      misPeriod: 0,
      misTitle: '물마시기',
      revContent: 'water is good for health',
      misDate: date,
      revImg: 'https://t1.daumcdn.net/cfile/tistory/99B5EC335982A2BF18',
    },
    {
      id: 1,
      misPeriod: 0,
      misTitle: '컵케이크 10개 먹기',
      revContent: '컵케이크 10개를 먹어봤다. 뿌듯하다!',
      misDate: date,
      revImg:
        'https://www.namesnack.com/images/namesnack-cupcake-business-names-3993x6005-20210127.jpeg?crop=16:9,smart&width=1200&dpr=2',
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

export default ReviewMonth;
