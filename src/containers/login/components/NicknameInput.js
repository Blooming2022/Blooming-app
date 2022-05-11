import React, {useEffect} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

const NicknameInput = ({
  nickname,
  setNickname,
  setButtonDisable,
  isExistName,
  setIsExistName,
}) => {
  var nicknameLength = nickname.length;
  const maxLengthOfNickname = 20;

  useEffect(() => {
    nicknameLength > 0 ? setButtonDisable(false) : setButtonDisable(true);
    setIsExistName(false);
  }, [nickname]);

  return (
    <>
      <View style={[styles.container, isExistName && styles.red]}>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={setNickname}
          placeholder="최대 20글자"
          placeholderTextColor={'#CCCDD0'}
          maxLength={maxLengthOfNickname}></TextInput>
      </View>
      {isExistName && (
        <Text style={styles.failText}>* 이미 사용중인 닉네임입니다.</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#8E8E8E',
    borderRadius: 100,
    alignItems: 'center',
  },
  red: {
    borderColor: '#F54D3F',
  },
  textInput: {
    fontSize: 16,
    color: '#242424',
    width: '90%',
  },
  failText: {
    marginTop: 10,
    fontSize: 12,
    color: '#F54D3F',
  },
});

export default NicknameInput;
