import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SaveButton = ({
  title,
  value,
  setValueIsNotValid,
  checkFunction,
  buttonDisabled,
  setButtonDisable,
  //navigation
}) => {
  const navigation = useNavigation();

  const checkIsValid = () => {
    if (checkFunction(value)) {
      setButtonDisable(true);
      setValueIsNotValid(true);
    } else {
      navigation.navigate('MissionTabNavigator'); //임의로 그냥 미션으로 이동하게 함. 나중에는 상황에 따라 props를 따로 받아서 처리
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
