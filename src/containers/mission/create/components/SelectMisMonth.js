import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {getKSTTime} from '../../../../service/commonServices';

// prettier-ignore
const wheelPickerData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SelectMisMonth = ({setMisMonth}) => {
  const nowMonth = new Date(getKSTTime()).getMonth();
  const nowYear = new Date(getKSTTime()).getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{nowYear}년</Text>
      <View style={styles.wheelBox}>
        <ScrollPicker
          dataSource={wheelPickerData}
          selectedIndex={nowMonth}
          renderItem={dataSource => {
            return <Text>{dataSource}</Text>;
          }}
          onValueChange={(data, selectedIndex) => {
            setMisMonth(selectedIndex); // 0 is January
          }}
          wrapperHeight={150}
          wrapperColor="#ffffff"
          itemHeight={50}
          highlightColor="#efefef"
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
    marginLeft: 100,
  },
  wheelBox: {
    position: 'absolute',
    bottom: -10,
    left: 80,
    width: 50,
  },
});

export default SelectMisMonth;
