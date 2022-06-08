import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import PhotoModal from '../create/components/PhotoModal';
import MissionInfoBox from '../create/components/MissionInfoBox';
import ReviewImageInput from '../create/components/ReviewImageInput';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import ReviewContentInput from '../create/components/ReviewContentInput';

const ReviewUpdate = ({route, navigation}) => {
  const [review, setReview] = useState(route.params.review);
  const isInitialMount = useRef(true);
  // 완료 버튼 색 변경 조건
  const [isValid, setIsValid] = useState(false);
  const [isImageExist, setIsImageExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // updateReview는 서버 연동 후 변경할 예정입니다. 지금은 화면 흐름만 구현했어요.
  const updateReview = () => {
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
        title="후기 편집"
        isValid={isValid}
        completeFunction={updateReview}></CompleteHeader>
      <ScrollView style={styles.container}>
        <PhotoModal
          review={review}
          setReview={setReview}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          isImageExist={isImageExist}
          width={300}
          height={300}></PhotoModal>
        <MissionInfoBox
          misSuccessDate={review.misSuccessDate}
          misPeriod={review.misPeriod}></MissionInfoBox>
        <ReviewImageInput
          isImageExist={isImageExist}
          revImg={review.revImg}
          deleteImage={deleteImage}
          setModalVisible={setModalVisible}></ReviewImageInput>
        <MissionTitleBox misTitle={review.misTitle}></MissionTitleBox>
        <ReviewContentInput review={review} setReview={setReview}></ReviewContentInput>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
});

export default ReviewUpdate;
