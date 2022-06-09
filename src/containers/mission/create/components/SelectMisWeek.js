import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  // prettier-ignore
  monthNames: ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'],
  dayNames: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  dayNamesShort: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
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
  var remainDay = [0, 6, 5, 4, 3, 2, 1];
  let startDate;
  const [duRange, setDuRange] = useState(0);

  return (
    <View style={styles.calender}>
      <Calendar
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2022-08-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow direction={direction} />}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        // Enable the option to swipe between months. Default = false
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
