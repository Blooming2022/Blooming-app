import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

const wheelPickerData = [
  '봄(3월-5월)',
  '여름(6월-8월)',
  '가을(9월-11월)',
  '겨울(12월-1월)',
];

//계절미션의 캘린더의 경우 한달미션 캘린더와 data 값이 다른 것을 제외하고 모두 동일합니다.
//따라서 계절미션 캘린더가 해결될 경우 동일하게 수정사항을 적용하면 됩니다.
const MisSeasonCalender = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 기본세팅이 '봄(3월-5월)'

  return (
    <View styles={styles.rowContainer}>
      <View styles={styles.container}>
        <Text styles={styles.text}> 2022 </Text>
      </View>
      <View style={styles.calender}>
        <WheelPicker
          selectedIndex={selectedIndex}
          visibleRest={3}
          itemHeight={30}
          options={wheelPickerData}
          onChange={index => setSelectedIndex(index)}></WheelPicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row', // 혹은 'column'
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    marginTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#242424',
  },
  calender: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
  },
});

export default MisSeasonCalender;
