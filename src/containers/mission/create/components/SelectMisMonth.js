import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import {StyleSheet, View, Text} from 'react-native';

// prettier-ignore
const wheelPickerData = ['1', '2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SelectMisMonth = () => {
  const nowMonth = new Date().getMonth();
  const [selectedIndex, setSelectedIndex] = useState(nowMonth);
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
      <Text style={styles.text}>월</Text>
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
    width: 80,
    marginHorizontal: 5,
  },
  weelText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#242424',
  },
});

export default SelectMisMonth;
