import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const MisMemoInput = ({misMemo, setMisMemo}) => {
  const maxLengthOfMisMemo = 50;
  const placeholderStr = `메모 (최대 ${maxLengthOfMisMemo}자)`;

  return (
    <>
      <View style={styles.container}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          onChangeText={setMisMemo}
          placeholder={placeholderStr}
          placeholderTextColor={'#999999'}
          value={misMemo}
          maxLength={maxLengthOfMisMemo}>
        </TextInput>
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
    fontSize: 16,
  },
});

export default MisMemoInput;
