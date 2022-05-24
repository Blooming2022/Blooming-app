import React from 'react';
import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import {formatDate} from '../../../service/commonServices';

const ReviewDetail = ({route, navigation}) => {
  const review = route.params.review;
  let misPeriodText;
  if (review.misPeriod === 0) {
    misPeriodText = '한주';
  } else if (review.misPeriod === 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }

  // 아래의 두 함수는 서버 연동 후 변경할 예정입니다. 지금은 화면 흐름만 구현했어요.
  const goToReviewUpdate = () => {
    navigation.navigate('ReviewUpdate', {review: review});
  };
  const deleteReview = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ReviewHome'}],
    });
  };

  return (
    <>
      <DetailHeader
        navigation={navigation}
        updateFunction={goToReviewUpdate}
        deleteFunction={deleteReview}></DetailHeader>
      <ScrollView style={styles.container}>
        <View style={styles.misInfoBox}>
          <Text style={styles.misDate}>{formatDate(review.misDate)}</Text>
          <View style={styles.periodBox}>
            <Text style={styles.misPeriod}>{misPeriodText}</Text>
          </View>
        </View>
        {review.revImg !== '' && (
          <Image
            style={styles.revImg}
            source={{
              uri: review.revImg,
            }}></Image>
        )}
        <View style={styles.titleBox}>
          <Text style={styles.misTitle}>{review.misTitle}</Text>
        </View>
        <Text style={styles.revContent}> {review.revContent}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  misDate: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 25,
  },
  periodBox: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  revImg: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 12,
    marginBottom: 25,
  },
  misInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBox: {
    paddingBottom: 25,
  },
  misTitle: {
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: '900',
    color: '#242424',
  },
  misPeriod: {
    fontSize: 16,
    color: '#888888',
  },
  revContent: {
    fontSize: 14,
    color: '#242424',
    paddingBottom: 100,
  },
});

export default ReviewDetail;
