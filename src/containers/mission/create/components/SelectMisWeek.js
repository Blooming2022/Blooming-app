import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {getKSTTime} from '../../../../service/commonServices';

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

const SelectMisWeek = ({setMisWeekStart, setMisWeekEnd}) => {
  const now = new Date(getKSTTime());
  const minDate = now.toISOString().substring(0, 10);
  const maxDate = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString().substring(0, 10);
  const [markedDates, setMarkedDates] = useState({});
  const prevDay = [6, 0, 1, 2, 3, 4, 5]; // calculate previous day
  const remainDay = [0, 6, 5, 4, 3, 2, 1, 0]; // calculate remain day

  const markDates = day => {
    let data = {};
    let startDay = new Date(day);
    let tempDay = new Date(startDay.setDate(startDay.getDate() - prevDay[startDay.getDay()]));
    let endDay = new Date(startDay.setDate(startDay.getDate() + remainDay[startDay.getDay()]));
    let diff = Math.abs((endDay - tempDay) / (24 * 60 * 60 * 1000)); // difference of start day and end day
    let tempDayKey = tempDay.toISOString().substring(0, 10);

    data[tempDayKey] = {startingDay: true, color: '#8752FF', textColor: '#ffffff'}; // add start day
    setMisWeekStart(new Date(tempDayKey).getTime());
    // fill a gap
    while (diff > 0) {
      tempDay = new Date(tempDay.setDate(tempDay.getDate() + 1)); // update tempDay
      tempDayKey = tempDay.toISOString().substring(0, 10); // update tempDayKey
      data[tempDayKey] = {
        color: '#8752FF',
        textColor: '#ffffff',
      };
      diff--;
    }
    data[tempDayKey] = {color: '#8752FF', textColor: '#ffffff', endingDay: true}; // add end day
    setMisWeekEnd(new Date(tempDayKey).getTime());
    setMarkedDates({...data});
  };

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
