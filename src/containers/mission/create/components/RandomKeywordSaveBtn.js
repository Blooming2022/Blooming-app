import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RandomKeywordSaveBtn = ({misInfo, selectedValue, buttonDisabled}) => {
  const navigation = useNavigation();

  const cancel = () => {
    navigation.goBack();
  };
  const goToMissionCreate = () => {
    const randomMisInfo = {...misInfo, ...{misTitle: selectedValue}};
    navigation.navigate('MissionCreate', {misInfo: randomMisInfo});
  };

  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity style={[styles.cancelButton, styles.button]} onPress={cancel}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, buttonDisabled ? styles.buttonDisable : styles.buttonAble]}
        disabled={buttonDisabled}
        onPress={() => {
          goToMissionCreate();
        }}>
        <Text style={[styles.buttonTextAble, buttonDisabled && styles.buttonTextDisable]}>
          추가
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: 'row',
    width: '100%',
    height: 68,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 68,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999',
  },
  buttonAble: {
    backgroundColor: '#242424',
  },
  buttonDisable: {
    backgroundColor: '#DCDEE1',
  },
  buttonTextAble: {
    fontSize: 16,
    color: '#ffffff',
  },
  buttonTextDisable: {
    color: '#68696B',
  },
});

export default RandomKeywordSaveBtn;
