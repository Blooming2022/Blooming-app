import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const UpdateHeader = ({navigation, title, isValid, updateFunction}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../assets/images/backBtn.png')}
          style={styles.backButtonImage}></Image>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={updateFunction}>
        <Text style={[styles.completeText, isValid && styles.violet]}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  backButtonImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: '#242424',
    fontWeight: 'bold',
  },
  completeText: {
    fontSize: 16,
    color: '#999999',
  },
  violet: {
    color: '#8752FF',
    fontWeight: 'bold',
  },
});

export default UpdateHeader;
