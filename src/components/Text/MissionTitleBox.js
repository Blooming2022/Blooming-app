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
    fontSize: 20,
    fontWeight: '900',
    color: '#242424',
  },
  line: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#C5C5C7',
    marginTop: 15,
  },
});

export default MissionTitleBox;
