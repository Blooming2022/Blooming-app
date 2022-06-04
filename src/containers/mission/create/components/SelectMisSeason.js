import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import {StyleSheet, View, Text} from 'react-native';

// prettier-ignore
const wheelPickerData = ['봄(3월-5월)', '여름(6월-8월)','가을(9월-11월)', '겨울(12월-2월)'];

const SelectMisSeason = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>2022</Text>
      <WheelPicker
        containerStyle={styles.weelBox}
        selectedIndex={selectedIndex}
        visibleRest={1}
        itemTextStyle={styles.weelText}
        options={wheelPickerData}
        onChange={index => setSelectedIndex(index)}></WheelPicker>
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
  },
  weelBox: {
    width: 200,
    marginHorizontal: 5,
  },
  weelText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#242424',
  },
});

export default SelectMisSeason;
