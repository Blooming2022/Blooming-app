import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import {getKSTTime} from '../../../service/commonServices';
import { createRev } from '../../../service/reviewServices';
import MissionInfoBox from './components/MissionInfoBox';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import PhotoModal from './components/PhotoModal';
import ReviewContentInput from './components/ReviewContentInput';
import ReviewImageInput from './components/ReviewImageInput';

const ReviewCreate = ({route, navigation}) => {
  const mission = route.params.mission;
  const isInitialMount = useRef(true);
  // 완료 버튼 색 변경 조건
  const [isValid, setIsValid] = useState(false);
  const [isImageExist, setIsImageExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState({
    misID: mission.id,
    misPeriod: mission.misPeriod,
    misTitle: mission.misTitle,
    misSuccessDate: mission.misSuccessDate,
    revContent: '',
    revImg: '',
  });

  // createReview는 서버 연동 후 변경할 예정입니다. 지금은 화면 흐름만 구현했어요.
  const createReview = () => {
    const createRevInfo = {
      misTitle: review.misTitle,
      misID : review.misID,
      misPeriod: review.misPeriod,
      misSuccessDate: review.misSuccessDate,
      revContent: review.revContent,
      revImg: review.revImg,
      isOutdated: false,
    }
    createRev(createRevInfo);
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
    } else if(review.revImg == '' && review.revContent == '') {
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
