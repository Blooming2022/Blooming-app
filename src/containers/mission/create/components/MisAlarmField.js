import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import WheelTimePicker from 'react-native-wheel-time-picker';

// 미션의 알람설정 기능을 나타내는 필드입니다.
// 실제 사용자가 설정한 알람시간을 입력받아 설정하는 것까지 구현이 되지 않았지만,
// 알람시간을 저장하기 위해서 필요한 값들을 AddSelfMission에서 받아오도록 props를 설정해두었습니다.
// 알람 설정 관련 변수들은 AddSelfMission에 더 자세히 기술해두었습니다.
const MisAlarmField = ({
  isAlarmSet,
  setIsAlarmSet,
  misAlarmStart,
  setMisAlarmStart,
  misAlarmStop,
  setMisAlarmStop,
  misAlarmStartTime,
  setMisAlarmStartTime,
  misAlarmStopTime,
  setMisAlarmStopTime,
}) => {
  //알람의 on/off 의 여부 확인을 통해 toggle 버튼, 알람시간설정 부분의 비활성화를 구현하려고 했으나
  //알람 시간 설정 부분의 비활성화까지는 구현하기 못하고 toggle 버튼까지 구현완료 햐였습니다.
  //CheckAlarmOn함수를 통해 토글버튼이 클릭되면, 기존에 AddSelfMission 부분에서 false로 되어있던 isAlarmSet 값을 true로 변경해줍니다.ㄷ
  //이렇게 변경된 값을 통해 토글버튼이 클릭될 때마다 활성화 여부에 따라 on/off 이미지를 구분하여 보여줍니다.
  const checkAlarmOn = () => {
    setIsAlarmSet(!isAlarmSet);
  };

  return (
    <View>
      <View style={styles.alarmHeader}>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../../../assets/images/alarm.png')}></Image>
          <Text style={styles.alarmTitle}> 알람설정 </Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.buttonContainerRight}
              onPress={checkAlarmOn}>
              {isAlarmSet == true ? (
                <Image
                  source={require('../../../../assets/images/toggleOn.png')}></Image>
              ) : (
                <Image
                  source={require('../../../../assets/images/toggleOff.png')}></Image>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* 이 밑부분은 사용자가 설정한 알람 시간 설정값을 받는 부분입니다.
      피그마에 구현되어있는 모양을 위해 가로로 여러 컴포넌트들을 담는 style인 rowContainer를 따로 만들고
      이외에도 최소 단위인 컴포넌트마다 별도의 style을 지정하여 추후 디자인 수정이 편하도록 하였습니다. */}
      {/* WheelTimePicker의 경우 react-native-wheel-time-picker를
      사용하였습니다. https://www.npmjs.com/package/react-native-wheel-time-picker*/}
      {/* 알람설정 파트에서 사용할 라이브러리를 많이 찾아보았으나, 적용 후 그 페이지에 들어가면
      접속 즉시 시간 설정 창이 모달로 뜨거나, 혹은 실제 모습이 보이지 않는 경우가 있었습니다.
      이와 같은 문제들을 해결하지 못하였습니다. 그럼에도 주석으로 처리하고 지우지 않은 이유는
      사용하는 라이브러리가 다르더라도 이와 같은 props를 공통으로 설정가능했기 때문입니다.
      피그마를 참고한 결과, 우리 어플에 사용되는 display는 spinner입니다. 참고부탁드리겠습니다.
      알람설정 파트는 새롭게 구현해주신다고 생각해주시면 될 것 같습니다. */}

      <View style={styles.rowContainer}>
        <View style={styles.alarmContent}>
          <View style={styles.columnContainer}>
            {/* <DateTimePicker
          mode="date"
          display="spinner"
          value={misAlarmStart}
          onChange={setMisAlarmStart}
          wheelProps={{
            wheelHeight: 70,
            itemHeight: 17,
          }}></DateTimePicker> */}
            <WheelTimePicker
              value={misAlarmStartTime}
              wheelProps={{
                wheelHeight: 70,
                itemHeight: 17,
              }}></WheelTimePicker>
          </View>
          <View style={styles.content}>
            <Image
              source={require('../../../../assets/images/arrow.png')}></Image>
          </View>
          <View style={styles.columnContainer}>
            {/* <DateTimePicker
          mode="date"
          display="spinner"
          value={misAlarmStop}
          onChange={setMisAlarmStop}
          wheelProps={{
            wheelHeight: 70,
            itemHeight: 17,
          }}></DateTimePicker> */}
            <WheelTimePicker
              value={misAlarmStopTime}
              wheelProps={{
                wheelHeight: 70,
                itemHeight: 17,
              }}></WheelTimePicker>
          </View>
        </View>
      </View>
    </View>
  );
};

// 스타일 이름들은 모두 사용되는 위치가 직관적으로 나타나도록 결정하였으며,
// rowContainer와 columnContainer는 컴포넌트를 각각 수평, 수직 공간에 나란히 놓기 위해 만든 것입니다.
// buttonContainerRight는 아이콘모양의 버튼이 다른 컴포넌트들과 수평으로 가장 오른쪽 끝에 존재할 떄 사용할 수 있도록 지정한 스타일입니다.
// 오른쪽 끝에 버튼이 들어가는 경우 버튼의 이미지를 이 스타일로 감싼 후 다른 컴포넌트들과 rowContainer로 묶이면 원하던 위치에 배치 가능합니다.
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  alarmHeader: {
    paddingLeft: 9,
    marginTop: 1,
  },
  toggleContainer: {
    //알람설정 텍스트와 토글버튼의 중간높이가 맞지 않아서 조절해보려고 만든 스타일이나 원하던 효과 못 얻음
    marginTop: 0,
  },
  alarmTitle: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 7.5,
    paddingRight: 10,
    // marginTop: 10,
    alignItems: 'center',
    color: '#242424',
  },
  alarmContent: {
    flexDirection: 'row', // 혹은 'column'
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
  },
  buttonContainerRight: {
    marginVertical: 5,
    marginHorizontal: 6,
    alignItems: 'flex-end',
  },
});

export default MisAlarmField;
