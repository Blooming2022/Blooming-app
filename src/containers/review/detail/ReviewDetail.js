import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView, Image} from 'react-native';
import DetailHeader from '../../../components/Header/DetailHeader';
import MissionInfoBox from '../create/components/MissionInfoBox';
import MissionTitleBox from '../../../components/Text/MissionTitleBox';
import DeleteModal from '../../../components/Modal/DeleteModal';
import {deleteRev} from '../../../service/reviewServices';

const ReviewDetail = ({route, navigation}) => {
  const review = route.params.review;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const goToReviewUpdate = () => {
    navigation.navigate('ReviewUpdate', {review: review});
  };
  const deleteReview = () => {
    const delRevInfo = {
      misID: review.misID,
      revImg: review.revImg,
      isOutdated: false, // prevSuccessMission 생성 이후 추가 작업 예정
    };
    deleteRev(delRevInfo);
    navigation.navigate('MainTab', {screen: 'ReviewHome'});
  };

  return (
    <>
      <DetailHeader
        navigation={navigation}
        updateFunction={goToReviewUpdate}
        setIsModalVisible={setIsModalVisible}
        from="review"></DetailHeader>
      <ScrollView style={styles.container}>
        <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          deleteFunction={deleteReview}></DeleteModal>
        <MissionInfoBox
          misSuccessDate={review.misSuccessDate}
          misPeriod={review.misPeriod}></MissionInfoBox>
        {review.revImg !== '' && (
          <Image
            style={styles.revImg}
            source={{
              uri: review.revImg,
            }}></Image>
        )}
        <MissionTitleBox misTitle={review.misTitle}></MissionTitleBox>
        <Text style={styles.revContent}>{review.revContent}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  revImg: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
  },
  revContent: {
    fontSize: 14,
    color: '#242424',
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});

export default ReviewDetail;
