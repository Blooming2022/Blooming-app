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
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

//미션추가할 때 미션 종류를 한달미션으로 선택한 경우
//미션 종류 선택 버튼 하단에 나오는 캘린더 필드 관련 파일입니다.
//우선 현재 5월 이므로, 올해의 말까지 12월까지만 data로 만들었습니다.
//react-native-wheel를 사용하였습니다. https://github.com/erksch/react-native-wheely
//다만 제 원래 계획은 좌우로 공간을 나눈다음 왼쪽에는 높이의 중간에 2022를 두고 오른쪽에는
//몇 월에 할건지 선택할 수 있는 wheel picker를 두려고 했습니다.
// 이를 위해 별도의 스타일도 지정해서 감싸주었지만, 아래와 같은 오류가 나타났습니다.
// virtualizedlists should never be nested inside plain scrollviews with the same orientation because it can break windowing and other functionality - use another virtualizedlist-backed container instead. virtualizedlist
// 또한, 아무리 폰트크기나 색상을 바꿔도 적용이 안되는 것으로 보아 위의 오류의 영향같아서, 우선 참고하시라고 오류 내용을 남겨두겠습니다.
// 몇월이 선택되었는지는 그 자체의 스트링값보다 선택가능한 data 중의 몇번째인지 인덱스값을 저장하는 것이 더 효율적이라 판단하여 selectedIndex를 선언했습니다.
const MisMonthCalender = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); //선택가능한 data(월)의 기본 인덱스 값은 0입니다. 기본 설정 월 : 5월

  return (
    <View styles={styles.rowContainer}>
      <View styles={styles.container}>
        {/* 이 2022의 위치와 스타일을 맘대로 지정하지 못하였습니다. 위에서 언급한 오류떄문인 것 같으나 해결하지 못했습니다. */}
        <Text styles={styles.text}> 2022 </Text>
      </View>
      <View style={styles.calender}>
        <WheelPicker
          selectedIndex={selectedIndex}
          visibleRest={3} // 현재 선택된 것의 위아래로 더 얼만큼 보이는지를 나타냅니다. 디폴트 : 2
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

export default MisMonthCalender;
