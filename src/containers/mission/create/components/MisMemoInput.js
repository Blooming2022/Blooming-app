import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

// 미션의 메모 내용을 입력받는 인풋파트입니다.
// 실제 사용자가 입력힌 메모를 받아서 그 길이가 0보다 크면 placeholder 오른쪽에 구현된 아이콘이 플러스에서 체크로 바뀝니다.
// 최대 메모의 글자 수는 14로 설정하였으나, 추후 변경애 용이하게끔 따로 수로 설정하였습니다.
// 입력받은 메모값, 그 메모값을 변수에 저장하는 set, 그리고 메모 길이가 0보다 클 때 아이콘이 변경하도록 하기 위한 memosave버튼 활성화관련 state를 props로 받습니다.
const MisMemoInput = ({setMisMemo}) => {
  const maxLengthOfMisMemo = 14;

  return (
    <>
      <View style={styles.container}>
        <TextInput
          autoFocus={false} //오토포커스하면 자동으로 키보드가 올라와서 false처리함
          style={styles.textInput}
          onChangeText={setMisMemo}
          placeholder="메모를 입력해주세요!"
          placeholderTextColor={'#999999'} //#CCCDD0은 닉네임색상, 피그마에 비해 연해서 임의로 바꿈
          maxLength={maxLengthOfMisMemo}></TextInput>
        {/* 최대 길이로 설정한 값 까지만 입력이 가능하도록 했습니다. 현재 가능한 길이 : 14
          값이 14로 고정되진 않더라도 추후 메모입력 가능값의 최대를 제한해야하는 상황이 생길 수 있을 것 같아서 만들었습니다. */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 1,
    paddingRight: 10,
  },
  textInput: {
    paddingLeft: 2,
    paddingBottom: 8,
    alignItems: 'center',
  },
});

export default MisMemoInput;
