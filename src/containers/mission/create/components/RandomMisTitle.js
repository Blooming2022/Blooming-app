import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const RandomMisTitle = ({misTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.misTitle}>{misTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#242424',
    borderBottomWidth: 2,
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 2,
  },
  misTitle: {
    paddingLeft: 5,
    paddingBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#242424',
  },
});

export default RandomMisTitle;
