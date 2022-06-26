import React from 'react';
import {StyleSheet, Text} from 'react-native';

const DdayCount = ({title, remainingTime}) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
        <Text style={styles.Dday}>D-{remainingTime}일</Text>
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
    fontSize: 32,
    color: '#242424',
  },
});

export default DdayCount;
