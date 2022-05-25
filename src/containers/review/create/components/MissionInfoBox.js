import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatDate} from '../../../../service/commonServices';

const MissionInfoBox = ({misDate, misPeriod}) => {
  let misPeriodText;
  if (misPeriod === 0) {
    misPeriodText = '한주';
  } else if (misPeriod === 1) {
    misPeriodText = '한달';
  } else {
    misPeriodText = '계절';
  }

  return (
    <View style={styles.misInfoBox}>
      <Text style={styles.misDate}>{formatDate(misDate)}</Text>
      <View style={styles.periodBox}>
        <Text style={styles.misPeriod}>{misPeriodText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  misInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 25,
  },
  misDate: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '600',
  },
  periodBox: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  misPeriod: {
    fontSize: 14,
    color: '#888888',
  },
});

export default MissionInfoBox;
