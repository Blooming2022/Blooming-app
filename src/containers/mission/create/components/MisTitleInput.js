import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const MisTitleInput = ({misTitle, setMisTitle}) => {
  const maxLengthOfMisTitle = 20;

  return (
    <>
      <View style={[styles.container]}>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={setMisTitle}
          placeholder="셀프 미션을 입력해주세요"
          placeholderTextColor={'#5B5B5B'} //#CCCDD0은 닉네임색상, 피그마에 비해 연해서 임의로 바꿈
          maxLength={maxLengthOfMisTitle}>{misTitle}</TextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#242424',
    borderBottomWidth: 2,
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  buttonContainerRight: {
    alignItems: 'flex-end',
    marginTop: 6,
    marginLeft: 80,
  },
  red: {
    borderBottomColor: '#F54D3F',
    borderBottomWidth: 2,
  },
  textInput: {
    paddingLeft: 5,
    paddingBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  failText: {
    marginTop: 5,
    fontSize: 12,
    color: '#F54D3F',
  },
});

export default MisTitleInput;
