import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MissionTitleBox = ({misTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.misTitle}>{misTitle}</Text>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  misTitle: {
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: '900',
    color: '#242424',
  },
  line: {
    height: 1,
    backgroundColor: '#999999',
    marginTop: 15,
  },
});

export default MissionTitleBox;
