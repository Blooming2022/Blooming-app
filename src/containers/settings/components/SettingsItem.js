import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const SettingsItem = ({title, text, hasImage, isButton, isLast, pressFunc}) => {
  return (
    <>
      <View style={styles.itemBox}>
        {isButton ? (
          <TouchableOpacity style={styles.touchable} onPress={pressFunc}>
            <Text style={[styles.title, isLast && styles.lastItem]}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {hasImage ? (
          <TouchableOpacity style={styles.goButton} onPress={pressFunc}>
            <Image
              style={styles.goButtonImg}
              source={require('../../../assets/images/backBtn.png')}></Image>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
      {!isLast && <View style={styles.separator}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 15,
  },
  title: {
    color: '#242424',
    fontSize: 16,
  },
  touchable: {
    paddingVertical: 15,
    width: '100%',
  },
  text: {
    color: '#999999',
    fontSize: 16,
  },
  goButton: {
    paddingVertical: 5,
    paddingLeft: 15,
  },
  goButtonImg: {
    resizeMode: 'contain',
    width: 10,
    transform: [{rotate: '180deg'}],
  },
  lastItem: {
    color: '#F14537',
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C7',
  },
});

export default SettingsItem;
