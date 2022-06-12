import React from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {StyleSheet, View, Text} from 'react-native';
import {getKSTTime} from '../../../../service/commonServices';

// prettier-ignore
const wheelPickerData = ['봄(3월-5월)', '여름(6월-8월)','가을(9월-11월)', '겨울(12월-2월)'];

const SelectMisSeason = ({setMisSeason}) => {
  const nowYear = new Date(getKSTTime()).getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nowYear}년</Text>
      <View style={styles.wheelBox}>
        <ScrollPicker
          dataSource={wheelPickerData}
          selectedIndex={0}
          renderItem={dataSource => {
            return <Text>{dataSource}</Text>;
          }}
          onValueChange={(data, selectedIndex) => {
            setMisSeason(selectedIndex); // 0 is Spring
          }}
          wrapperHeight={150}
          wrapperColor="#ffffff"
          itemHeight={50}
          highlightColor="#efefef"
          highlightBorderWidth={25}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#242424',
    marginRight: 15,
  },
  wheelBox: {
    width: 200,
    marginHorizontal: 5,
  },
});

export default SelectMisSeason;
