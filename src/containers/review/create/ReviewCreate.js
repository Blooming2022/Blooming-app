import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import {formatDate, getKSTTime} from '../../../service/commonServices';
import PhotoModal from './components/PhotoModal';
import ReviewContentInput from './components/ReviewContentInput';

const ReviewCreate = ({route, navigation}) => {
  // const mission = route.params.mission;
  const mission = {
    id: 0,
    misPeriod: 0,
    misTitle: '아하하',
  };
  const [isValid, setIsValid] = useState(false);
  const [isImageExist, setIsImageExist] = useState(false);
  const [review, setReview] = useState({
    misID: mission.id,
    misPeriod: mission.misPeriod,
    misTitle: mission.misTitle,
    revDate: getKSTTime(),
    revContent: '',
    revImg: '',
    uri: '',
  });
  let misPeriodText;
  if (mission.misPeriod === 0) {
    misPeriodText = '한주';
  } else if (mission.misPeriod === 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }
  let source;
  review.revImg == ''
    ? (source = require('../../../assets/images/addImage.png'))
    : (source = {uri: review.revImg});
  const [isModalVisible, setModalVisible] = useState(false);

  const createReview = () => {
    console.log(review);
    navigation.navigate('ReviewDetail', {review: review});
  };
  const deleteImage = () => {
    setReview({...review, ...{revImg: ''}});
    setIsImageExist(!isImageExist);
  };

  useEffect(() => {
    if (review.revContent !== '') setIsValid(true);
  }, [review]);

  return (
    <>
      <CompleteHeader
        navigation={navigation}
        title="후기 작성"
        isValid={isValid}
        completeFunction={createReview}></CompleteHeader>
      <ScrollView style={styles.container}>
        <PhotoModal
          review={review}
          setReview={setReview}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          isImageExist={isImageExist}
          setIsImageExist={setIsImageExist}
          width={300}
          height={300}></PhotoModal>
        <View style={styles.content}>
          <View style={styles.misInfoBox}>
            <Text style={styles.revDate}>{formatDate(review.revDate)}</Text>
            <View style={styles.periodBox}>
              <Text style={styles.misPeriod}>{misPeriodText}</Text>
            </View>
          </View>
          {isImageExist ? (
            <View style={styles.imgBox}>
              <Image style={styles.revImg} source={source}></Image>
              <TouchableOpacity onPress={() => deleteImage()}>
                <Image
                  style={styles.deleteImgBtn}
                  source={require('../../../assets/images/deleteBtn.png')}></Image>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image style={styles.revImg} source={source}></Image>
            </TouchableOpacity>
          )}
          <View style={styles.titleBox}>
            <Text style={styles.misTitle}>{review.misTitle}</Text>
          </View>
          <View style={styles.line}></View>
          <ReviewContentInput review={review} setReview={setReview}></ReviewContentInput>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 27,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
  },
  revDate: {
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
  imgBox: {
    position: 'relative',
  },
  revImg: {
    width: 111,
    height: 111,
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
  misInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBox: {
    paddingHorizontal: 10,
    width: '90%',
  },
  line: {
    height: 1,
    backgroundColor: '#999999',
    marginVertical: 15,
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
  },
});

export default ReviewCreate;
