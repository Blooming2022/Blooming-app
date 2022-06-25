import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import PhotoModal from '../create/components/PhotoModal';
import MissionInfoBox from '../create/components/MissionInfoBox';
import ReviewImageInput from '../create/components/ReviewImageInput';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import ReviewContentInput from '../create/components/ReviewContentInput';
import {updateRev} from '../../../service/reviewServices';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const ReviewUpdate = ({route, navigation}) => {
  const initialReview = route.params.review;
  const [review, setReview] = useState(route.params.review);
  const isInitialMount = useRef(true); // To disable the complete button on the first rendering
  const [isValid, setIsValid] = useState(false); // Conditions for changing color of complete buttons
  const [isImageExist, setIsImageExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {isReviewChanged, setIsReviewChanged} = useReviewChanged();

  const updateReview = async () => {
    const updateRevInfo = {
      misID: initialReview.misID,
    };
    const revData = {};
    if (initialReview.revContent !== review.revContent) revData.revContent = review.revContent;
    if (initialReview.revImg !== review.revImg) {
      revData.revImg = review.revImg;
      updateRevInfo.isImgUpdate = true;
    } else {
      updateRevInfo.isImgUpdate = false;
    }
    updateRevInfo.revData = revData;
    const result = await updateRev(updateRevInfo);
    setIsReviewChanged(!isReviewChanged);
    navigation.navigate('ReviewDetail', {review: result});
  };
  const deleteImage = () => {
    setReview({...review, ...{revImg: ''}});
    setIsImageExist(!isImageExist);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (review.revContent == '' && review.revImg == '')
        setIsValid(false); // an essential condition
      else if (initialReview.revContent !== review.revContent) setIsValid(true);
      else if (initialReview.revImg !== review.revImg) setIsValid(true);
      else setIsValid(false); // If there is no change in the revContent, revImg
    }
  }, [review]);
  useEffect(() => {
    if (review.revImg !== '') setIsImageExist(true);
  }, [review.revImg]);

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
