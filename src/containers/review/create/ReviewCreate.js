import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import CompleteHeader from '../../../components/Header/CompleteHeader';
import {getKSTTime} from '../../../service/commonServices';
import MissionInfoBox from './components/MissionInfoBox';
import MissionTitleBox from './components/MissionTitleBox';
import PhotoModal from './components/PhotoModal';
import ReviewContentInput from './components/ReviewContentInput';
import ReviewImageInput from './components/ReviewImageInput';

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
        <MissionInfoBox misDate={review.misDate} misPeriod={mission.misPeriod}></MissionInfoBox>
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