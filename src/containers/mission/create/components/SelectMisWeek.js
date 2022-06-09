import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { getKSTTime } from '../../../../service/commonServices';

LocaleConfig.locales['ko'] = {
  // prettier-ignore
  monthNames: ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'],
  dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ko';

const Arrow = ({direction}) => {
  return (
    <TouchableOpacity>
      {direction == 'left' ? (
        <Image
          style={styles.backImage}
          source={require('../../../../assets/images/backBtn.png')}></Image>
      ) : (
        <Image source={require('../../../../assets/images/backBtn.png')}></Image>
      )}
    </TouchableOpacity>
  );
};


const SelectMisWeek = ({misWeekStart, setMisWeekStart, misWeekEnd, setMisWeekEnd}) => {
  const now = new Date(getKSTTime());
  const minDate = now.toISOString().substring(0,10);
  const maxDate = new Date(now.setFullYear(now.getFullYear()+1)).toISOString().substring(0,10);
  const [markedDates, setMarkedDates] = useState({});
  const remainDay = [0, 6, 5, 4, 3, 2, 1, 0];
  let data = {};

  const markDates = (day) => {
    data[day] = {startingDay: true, color: '#8752FF', textColor: '#ffffff'};
    let startDay = new Date(day);
    let endDay = new Date(startDay.setDate(startDay.getDate() + remainDay[startDay.getDay()]));
    let endDayKey = endDay.toISOString().substring(0, 10);
    data[endDayKey] = {color: '#8752FF', textColor: '#ffffff', endingDay: true};
    setMarkedDates({...data});
    console.log(JSON.stringify(Object.entries(markedDates)));
  }

  return (
    <View style={styles.calender}>
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={day => {
          markDates(day.dateString);
        }}
        firstDay={1} // start Monday
        monthFormat={'yyyy.MM'}
        // renderArrow={direction => <Arrow direction={direction} />}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calender: {
    marginVertical: 15,
  },
  backImage: {
    width: 10,
    resizeMode: 'contain',
  },
});
export default SelectMisWeek;
