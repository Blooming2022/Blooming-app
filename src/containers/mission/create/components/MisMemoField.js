import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import MisMemoInput from './MisMemoInput';

// 미션의 메모설정 기능을 나타내는 필드입니다.
// 실제 사용자가 입력힌 메모를 저장하는 것까지 구현이 되지 않았지만,
// 메모를 저장하기 위해서 필요한 값들을 AddSelfMission에서 받아오도록 props를 설정해두었습니다.
// 메모 설정 관련 변수들은 AddSelfMission에 더 자세히 기술해두었습니다.
// 메모 설정 필드 내부에는 메모의 TextInput을 받는 모듈 MisMemoInput이 있습니다.
// 메모 인풋 모듈의 경우 해달 파일에서 더 상세히 설명하겠습니다.
const MisMemoField = ({
  misMemo,
  setMisMemo,
  memoSaveBtnDisabled, //이 변수를 통해 메모를 입력해주세요 오른쪽에 있는 플러스 버튼이 메모값이 입력된 경우 체크표시로 바뀝니다. 따라서 입력받는 모듈에도 이 값이 props로 전달됩니다.
  setMemoSaveBtnDisabled,
}) => {
  return (
    <View style={styles.memoHeader}>
      <View style={styles.rowContainer}>
        <Image source={require('../../../../assets/images/memo.png')}></Image>
        <Text style={styles.memoTitle}> 메모 </Text>
        <MisMemoInput
          misMemo={misMemo}
          setMisMemo={setMisMemo}
          setMemoSaveBtnDisabled={setMemoSaveBtnDisabled}></MisMemoInput>
        <TouchableOpacity style={styles.buttonContainerRight}>
          {memoSaveBtnDisabled == true ? (
            <Image
              source={require('../../../../assets/images/plusButton.png')}></Image>
          ) : (
            <Image
              source={require('../../../../assets/images/checkButtonActive.png')}></Image>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memoHeader: {
    paddingLeft: 10,
  },
  memoTitle: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
    // marginTop: 10,
    alignItems: 'center',
    color: '#242424',
  },
  buttonContainerRight: {
    marginVertical: 5,
    marginHorizontal: 6,
    alignItems: 'flex-end',
  },
});

export default MisMemoField;
