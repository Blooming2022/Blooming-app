import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import {formatDate, getKSTTime} from '../../../service/commonServices';
import PhotoModal from './components/PhotoModal';
import ReviewContentInput from './components/ReviewContentInput';

const ReviewCreate = ({route, navigation}) => {
  // const mission = route.params.mission;
  // 미션 생성 화면 구현 후 위처럼 route.params로 받을 예정. 임시 데이터.
  const mission = {
    id: 0,
    misPeriod: 0,
    misTitle: '아하하',
    mistDate: getKSTTime(),
  };
  const isInitialMount = useRef(true);
  // 완료 버튼 색 변경 조건
  const [isValid, setIsValid] = useState(false);
  const [isImageExist, setIsImageExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState({
    misID: mission.id,
    misPeriod: mission.misPeriod,
    misTitle: mission.misTitle,
    misDate: mission.mistDate,
    revContent: '',
    revImg: '',
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

  // createReview는 서버 연동 후 변경할 예정입니다. 지금은 화면 흐름만 구현했어요.
  const createReview = () => {
    console.log(review);
    navigation.navigate('ReviewDetail', {review: review});
  };
  const deleteImage = () => {
    setReview({...review, ...{revImg: ''}});
    setIsImageExist(!isImageExist);
  };

  useEffect(() => {
    if (review.revImg !== '') setIsImageExist(true);
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setIsValid(true);
    }
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
            <Text style={styles.misDate}>{formatDate(review.misDate)}</Text>
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
              style={styles.revImg}
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
