import React from 'react';
import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import {formatDate} from '../../../service/commonServices';

const ReviewDetail = ({route, navigation}) => {
  const review = route.params.review;
  let misPeriod;
  if (review.misPeriod === 0) {
    misPeriod = '한주미션';
  } else if (review.misPeriod === 1) {
    misPeriod = '한달미션';
  } else {
    misPeriod = '계절미션';
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.revDate}>{formatDate(review.revDate)}</Text>
      {review.revImg !== '' && (
        <Image
          style={styles.revImg}
          source={{
            uri: review.revImg,
          }}></Image>
      )}
      <View style={styles.misInfoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.misTitle}>{review.misTitle}</Text>
        </View>
        <Text style={styles.misPeriod}>{misPeriod}</Text>
      </View>
      <Text style={styles.revContent}> {review.revContent}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  revDate: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 25,
  },
  revImg: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 12,
    marginBottom: 25,
  },
  misInfoBox: {
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBox: {
    width: '80%',
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
