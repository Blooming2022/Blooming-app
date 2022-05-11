import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const SaveButton = ({
  title,
  value,
  setValueIsNotValid,
  checkFunction,
  buttonDisabled,
  setButtonDisable,
}) => {
  const checkIsValid = () => {
    if (checkFunction(value)) {
      setButtonDisable(true);
      setValueIsNotValid(true);
    } else {
      // navigation.navigate('Mission'); 성공 시 이동
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonDisabled ? styles.buttonDisable : styles.buttonAble,
      ]}
      disabled={buttonDisabled}
      onPress={() => {
        checkIsValid();
      }}>
      <Text style={[styles.buttonText, buttonDisabled && styles.textDisable]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
  },
  buttonAble: {
    backgroundColor: '#000000',
  },
  buttonDisable: {
    backgroundColor: '#DCDEE1',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  textDisable: {
    color: '#68696B',
  },
});

export default SaveButton;
