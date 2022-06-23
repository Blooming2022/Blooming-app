import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ViewAllActivitiesBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('PrevSuccessMissionList');
      }}>
      <Text style={styles.buttonText}>지난 활동 보기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 46,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 14,
    color: '#242424',
  },
});

export default ViewAllActivitiesBtn;
