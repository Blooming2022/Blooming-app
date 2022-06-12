import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MisPeriodText = ({misPeriod}) => {
  let misPeriodText;
  if (misPeriod == 0) {
    misPeriodText = '한주';
  } else if (misPeriod == 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }

  return (
    <View style={styles.periodBoxWrapper}>
      <View style={styles.periodBox}>
        <Text style={styles.misPeriod}>{misPeriodText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  periodBoxWrapper: {
    alignItems: 'flex-end',
  },
  periodBox: {
    width: 57,
    height: 37,
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  misPeriod: {
    fontSize: 14,
    color: '#888888',
  },
});

export default MisPeriodText;
