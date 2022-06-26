import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import {createRev} from '../../../service/reviewServices';
import MissionInfoBox from './components/MissionInfoBox';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import PhotoModal from './components/PhotoModal';
import ReviewContentInput from './components/ReviewContentInput';
import ReviewImageInput from './components/ReviewImageInput';
import useReviewChanged from '../../../context/hook/useReviewChanged';

const ReviewCreate = ({route, navigation}) => {
  const mission = route.params.mission;
  const isOutdated = route.params.isOutdated;
  const isInitialMount = useRef(true); // To disable the complete button on the first rendering
  const [isValid, setIsValid] = useState(false); // Conditions for changing color of complete buttons
  const [isImageExist, setIsImageExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {isReviewChanged, setIsReviewChanged} = useReviewChanged();
  const [review, setReview] = useState({
    misID: mission.id,
    misPeriod: mission.misPeriod,
    misTitle: mission.misTitle,
    misSuccessDate: mission.misSuccessDate,
    revContent: '',
    revImg: '',
  });

  const createReview = async () => {
    const createRevInfo = {
      ...review,
      ...{isOutdated: isOutdated},
    };
    const result = await createRev(createRevInfo);
    setIsReviewChanged(!isReviewChanged);
    navigation.navigate('ReviewDetail', {review: result});
  };
  const deleteImage = () => {
    setReview({...review, ...{revImg: ''}});
    setIsImageExist(!isImageExist);
  };

  useEffect(() => {
    if (review.revImg !== '') setIsImageExist(true);
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (review.revImg == '' && review.revContent == '') {
      setIsValid(false);
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
        <MissionInfoBox
          misSuccessDate={review.misSuccessDate}
          misPeriod={mission.misPeriod}></MissionInfoBox>
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

export default ReviewCreate;
