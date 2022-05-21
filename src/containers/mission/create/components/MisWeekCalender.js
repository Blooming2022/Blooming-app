/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

//미션추가할 때 미션 종류를 한주미션으로 선택한 경우
//미션 종류 선택 버튼 하단에 나오는 캘린더 필드 관련 파일입니다.
//우선 오늘 날짜에 보라색 동그라미로 표시되도록 했고, 5월 기준으로 8월까지 가능하도록 했습니다.
//react-native-calendar-picker를 사용하였습니다. https://www.npmjs.com/package/react-native-calendar-picker
//여기서 구현하지 못한 기능은
//한주의 어느 날짜를 선택하든 그 주의 월-일이 한번에 자동으로 표시되는 기능(한주 미션이기 때문에 월요일에 시작하든 금요일에 시작하든 일요일에 끝나야 하기 떄문)입니다.
// 현재는 시작날짜와 끝나는 날짜를 선택하여야 하는, 사용자에게 2번의 화면터치를 요구하고 있습니다.
// 또한, 시작날짜 기준으로 6일 후만 선택이 되도록 되어있습니다.
// 찾아놓은 레퍼런스 첨부합니다 : https://github.com/wix/react-native-calendars/issues/40

const MisWeekCalender = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type == 'END_STATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
    console.log('selectedEndDate: ' + selectedEndDate); // 콘솔에 출력해보면서 상태값에 올바른 값이 할당되고 있는 지 체크했습니다.
    console.log('selectedStartDate: ' + selectedStartDate);
  };

  return (
    <View style={styles.calender}>
      <CalendarPicker
        startFromMonday={true} //한주를 월요일에 시작하는지, 일요일에 시작하는 지 여부
        allowRangeSelection={true} //달력을 사용할 때 구간을 선택할 수 있는지의 여부
        restrictMonthNavigation={true} // 이전달 다음달 이동을 제한하는 지의 여부
        minRangeDuration={6} //선택한 시작날짜 기준으로 최소 몇 일 이후부터 선택 가능한 지
        maxRangeDuration={6} //선택한 시작날짜 기준으로 최소 몇 일 까지만 선택 가능한 지
        minDate={new Date()} //선택가능한 최소날짜를 오늘로 설정, 오늘 이전 날짜는 선택불가능한 비활성화 상태
        maxDate={new Date(2022, 5, 100)} //대략 5월 기준으로 8월까지만 되도록 선택한 값
        weekdays={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']} // 일주일은 월요일부터 시작
        months={[
          '01월',
          '02월',
          '03월',
          '04월',
          '05월',
          '06월',
          '07월',
          '08월',
          '09월',
          '10월',
          '11월',
          '12월',
        ]}
        previousTitle="이전달"
        previousTitleStyle={{
          color: '#C5C5C7',
          fontWeight: 'bold',
          paddingLeft: 20,
        }} //이전달로 넘어가는 버튼의 스타일 지정
        nextTitle="다음달"
        nextTitleStyle={{
          color: '#C5C5C7',
          fontWeight: 'bold',
          paddingRight: 20,
        }} //다음달로 넘어가는 버튼의 스타일 지정
        todayBackgroundColor="#8752FF"
        selectedDayColor="#242424" // 선택된 날자의 스타일
        selectedDayTextColor="#FFF"
        selectedDayStyle={{
          fontWeight: 'bold',
        }}
        scaleFactor={375} // 캘린더 자체의 크기, 375권장
        textStyle={{
          fontFamily: 'Cochin',
          color: '#242424',
        }}
        // 데이터가 변화할 때 시작날, 마지막날 상태값에 어떻게 그 값을 전달할 건지를 나타내는 함수, 맨 위에 함수 정의되어있음
        onDateChange={onDateChange}></CalendarPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  calender: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
  },
});
export default MisWeekCalender;
