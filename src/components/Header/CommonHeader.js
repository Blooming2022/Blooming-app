import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const CommonHeader = ({navigation, title, hasArrow}) => {
  return (
    <View style={styles.container}>
      {hasArrow ? (
        <>
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
          <View style={styles.flex}></View>
        </>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 18,
    flex: 1,
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
    flex: 1,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default CommonHeader;
