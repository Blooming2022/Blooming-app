import React from 'react';
import {StyleSheet, Text} from 'react-native';

const DdayCount = ({title, remainingTime, period}) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {period == 2 ? (
        <Text style={styles.Dday}>D-{remainingTime}주</Text>
      ) : (
        <Text style={styles.Dday}>D-{remainingTime}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    fontSize: 16,
    color: '#242424',
  },
  Dday: {
    fontSize: 36,
    color: '#242424',
  },
});

export default DdayCount;
