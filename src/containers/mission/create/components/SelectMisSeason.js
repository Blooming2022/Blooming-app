import React from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {StyleSheet, View, Text} from 'react-native';

// prettier-ignore
const wheelPickerData = ['봄(3월-5월)', '여름(6월-8월)','가을(9월-11월)', '겨울(12월-2월)'];

const SelectMisSeason = ({setMisSeason}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>2022</Text>
      <View style={styles.wheelBox}>
          <ScrollPicker
          dataSource={wheelPickerData}
          selectedIndex={0}
          renderItem={(dataSource) => {
            return (
              <Text>{dataSource}</Text>
            );
          }}
          onValueChange={(data, selectedIndex) => {
            setMisSeason(selectedIndex) // 계절에 대한 필드값 필요. 인덱스값 보낼게요
          }}
          wrapperHeight={150}
          wrapperColor='#ffffff'
          itemHeight={50}
          highlightColor='#efefef'
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
    marginRight: 15
  },
  wheelBox: {
    width: 200,
    marginHorizontal: 5,
  }
});

export default SelectMisSeason;
