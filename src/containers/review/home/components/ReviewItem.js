import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, ImageBackground, TouchableHighlight} from 'react-native';
import {formatDate} from '../../../../service/commonServices';

const ReviewItem = ({review, width}) => {
  const navigation = useNavigation();
  const goToReviewDetail = () => {
    navigation.navigate('ReviewDetail', {review: review});
  };

  return (
    <TouchableHighlight onPress={goToReviewDetail} style={[styles.container, {width: width}]}>
      {review.revImg == '' ? (
        <View style={[styles.blankImage, {width: width}]}>
          <Text style={styles.revTime}>{formatDate(review.misDate)}</Text>
          <View style={styles.titleBox}>
            <Text style={styles.blankImageTitle} numberOfLines={3} ellipsizeMode="tail">
              {review.misTitle}
            </Text>
          </View>
        </View>
      ) : (
        <ImageBackground source={{uri: review.revImg}} style={styles.reviewImage}>
          <ImageBackground
            source={require('./../../../../assets/images/gradient.png')}
            style={styles.gradient}>
            <Text style={styles.revTime}>{formatDate(review.misDate)}</Text>
          </ImageBackground>
        </ImageBackground>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    maxWidth: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  blankImage: {
    backgroundColor: '#242424',
    aspectRatio: 1 / 1,
  },
  revTime: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 8,
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  blankImageTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewImage: {
    aspectRatio: 1 / 1,
  },
  gradient: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});
export default ReviewItem;
