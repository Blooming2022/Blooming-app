import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

const MisWeekCalendar = ({misWeekStart, setMisWeekStart, setMisWeekEnd}) => {
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  var remainDay = [0, 6, 5, 4, 3, 2, 1];
  let startDate;
  const [duRange, setDuRange] = useState(0)
  useEffect(()=>{
    // selectedStartDate.setHours(i.getHours()-12)
    // setTimeout(()=>console.log('start :' + selectedStartDate.getHours()), 1000);
    // console.log(typeof selectedStartDate);
    // setTimeout(()=>console.log('end :' + selectedEndDate.getHours()), 1000)
    setSelectedStartDate(selectedStartDate);
    setSelectedEndDate(selectedEndDate);
    }, [duRange])

  const onDateChange = (date, type) => { // 현재는 낮 12시를 기준으로 만들어짐.
    //function to handle the date change
    if (type == 'END_STATE') {
      setSelectedEndDate(date);
      // console.log('selectedEndDate: ' + selectedEndDate); // 콘솔에 출력해보면서 상태값에 올바른 값이 할당되고 있는 지 체크했습니다.
    } else {
      setSelectedStartDate(date);
      setTimeout(()=> {startDate = new Date(date); setDuRange(remainDay[startDate.getDay()]);console.log(startDate);
        console.log(duRange);}, 1000);
      // setDuRange(remainDay[startDate.getDay()]);
      // console.log(startDate)
      // console.log(duRange)
      // setSelectedEndDate(endDate)
    }
    // console.log('selectedStartDate: ' + selectedStartDate);
  };

  return (
    <View style={styles.calender}>
      <CalendarPicker
        startFromMonday={true} //한주를 월요일에 시작하는지, 일요일에 시작하는 지 여부
        allowRangeSelection={true} //달력을 사용할 때 구간을 선택할 수 있는지의 여부
        restrictMonthNavigation={true} // 이전달 다음달 이동을 제한하는 지의 여부
        minRangeDuration={duRange} //선택한 시작날짜 기준으로 최소 몇 일 이후부터 선택 가능한 지
        maxRangeDuration={duRange} //선택한 시작날짜 기준으로 최소 몇 일 까지만 선택 가능한 지
        minDate={new Date()} //선택가능한 최소날짜를 오늘로 설정, 오늘 이전 날짜는 선택불가능한 비활성화 상태
        // maxDate={new Date(2022, 5, 100)} //대략 5월 기준으로 8월까지만 되도록 선택한 값
        weekdays={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']} // 일주일은 월요일부터 시작
        // prettier-ignore
        months={['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월']}
        previousTitle="<"
        previousTitleStyle={{
          color: '#C5C5C7',
          paddingLeft: 80,
          fontSize: 30
        }} //이전달로 넘어가는 버튼의 스타일 지정
        nextTitle=">"
        nextTitleStyle={{
          color: '#C5C5C7',
          paddingRight: 80,
          fontSize: 30
        }} //다음달로 넘어가는 버튼의 스타일 지정
        todayBackgroundColor="#ffffff"
        todayTextStyle="#242424"
        selectedDayColor="#242424" // 선택된 날자의 스타일
        selectedDayTextColor="#ffffff"
        selectedDayStyle={{
          fontWeight: 'bold',
        }}
        width={360}
        // scaleFactor={375} // 캘린더 자체의 크기, 375권장
        textStyle={{
          color: '#242424',
        }}
        // 데이터가 변화할 때 시작날, 마지막날 상태값에 어떻게 그 값을 전달할 건지를 나타내는 함수, 맨 위에 함수 정의되어있음
        onDateChange={onDateChange}></CalendarPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  calender: {
    marginVertical: 15,
  },
});
export default MisWeekCalendar;
