import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {formatDate, getKSTTime} from '../../../service/commonServices';
import SaveButton from '../../../components/Button/SaveButton';
import PhotoModal from './components/PhotoModal';

const ReviewCreate = ({route, navigation}) => {
  // const mission = route.params.mission;
  const mission = {
    id: 0,
    misPeriod: 0,
    misTitle: '아하하',
  };
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
  const deleteImage = () => {
    setReview({...review, ...{revImg: ''}});
    setIsImageExist(!isImageExist);
  };
  return (
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
        <Text style={styles.revContent}> {review.revContent}</Text>
      </View>
      <SaveButton title="저장"></SaveButton>
    </ScrollView>
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
    width: '90%',
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

export default ReviewCreate;
