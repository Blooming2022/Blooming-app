import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const MisMemoInput = ({misMemo, setMisMemo}) => {
  const maxLengthOfMisMemo = 50;

  return (
    <>
      <View style={styles.container}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          onChangeText={setMisMemo}
          placeholder="메모를 입력해주세요(최대 50자)"
          placeholderTextColor={'#999999'}
          maxLength={maxLengthOfMisMemo}>{misMemo}</TextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  textInput: {
    paddingBottom: 8,
    alignItems: 'center',
  },
});

export default MisMemoInput;
