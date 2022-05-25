import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReviewList from './components/ReviewList';
import {getKSTTime} from './../../../service/commonServices';

const ReviewWeek = () => {
  const date = getKSTTime();
  // dummy data. CRUD와 연동 안됨.
  const [reviewList, setReviewList] = useState([
    {
      id: 0,
      misPeriod: 0,
      misTitle: '물마시기',
      revContent: 'water is good for health',
      misSuccessDate: date,
      revImg: 'https://t1.daumcdn.net/cfile/tistory/99B5EC335982A2BF18',
    },
    {
      id: 1,
      misPeriod: 0,
      misTitle: '강아지 산책하기',
      revContent: '강아지랑 동네 한바퀴 돌고 왔다. 뿌듯하다!',
      misSuccessDate: date,
      revImg: 'https://www.helpguide.org/wp-content/uploads/dog-owner-walking-on-trail-768.jpg',
    },
    {
      id: 2,
      misPeriod: 0,
      misTitle: '강아지랑 동네 한바퀴 돌고 아이스아메리카노 마시기.아이고 더 길어야하네',
      revContent: '강아지랑 동네 한바퀴 돌고 왔다. 뿌듯하다!',
      misSuccessDate: date,
      revImg: '',
    },
    {
      id: 3,
      misPeriod: 0,
      misTitle: '강아지 산책하면서 개발 책 읽기',
      revContent:
        '위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.',
      misSuccessDate: date,
      revImg:
        'https://images.theconversation.com/files/223380/original/file-20180615-85830-1m127xe.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    },
    {
      id: 4,
      misPeriod: 0,
      misTitle: '컵케이크 10개 먹기',
      revContent: '컵케이크 10개를 먹어봤다. 뿌듯하다!',
      misSuccessDate: date,
      revImg:
        'https://www.namesnack.com/images/namesnack-cupcake-business-names-3993x6005-20210127.jpeg?crop=16:9,smart&width=1200&dpr=2',
    },
    {
      id: 5,
      misPeriod: 0,
      misTitle: '책 3권 읽기',
      revContent:
        '위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.위의 코드는 함수형 컴포넌트가 실행되고 결과를 생성하는 것과 무관한 document.title을 수정하고 있습니다. 이러한 코드는 작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.',
      misSuccessDate: date,
      revImg: '',
    },
    {
      id: 6,
      misPeriod: 0,
      misTitle: '하얀 배경 고려하기',
      revContent: '하얀 배경 고려하기. 완료!',
      misSuccessDate: date,
      revImg: 'https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg',
    },
    {
      id: 7,
      misPeriod: 0,
      misTitle: '아침 요가하기',
      revContent: '아침 요가 30분 했다. 뿌듯하다!',
      misSuccessDate: date,
      revImg:
        'https://img.activityjapan.com/10/35560/10000003556001_iwUFrncm_3.jpg?version=1633060094',
    },
  ]);
  return (
    <View style={styles.container}>
      <ReviewList reviewList={reviewList}></ReviewList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default ReviewWeek;
