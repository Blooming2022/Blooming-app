import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

// prettier-ignore
const wheelPickerData = ['1', '2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SelectMisMonth = ({setMisMonth}) => {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();
  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{nowYear}년</Text>
        <View style={styles.weelBox}>
          <ScrollPicker
          dataSource={wheelPickerData}
          selectedIndex={nowMonth}
          renderItem={(dataSource) => {
            return (
              <Text>{dataSource}</Text>
            )
          }}
          onValueChange={(data) => {
            setMisMonth(data) // 월 정보가 저장
          }}
          itemTextStyle = {{fontSize: 24, color: '#ffffff'}}
          wrapperHeight={150}
          wrapperWidth={50}
          wrapperColor='#ffffff'
          itemHeight={50}
          highlightColor='#efefef'
          highlightBorderWidth={25}
          />
        </View>
      <Text style={styles.monthText}>월</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 130,
    marginLeft: 20,
    marginVertical: 20,
  },
  yearText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#242424',
  },
  monthText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#242424',
    marginLeft: 100
  },
  weelBox: {
    position: 'absolute',
    bottom:-10,
    left: 80,
    width: 50
  },
});

export default SelectMisMonth;
