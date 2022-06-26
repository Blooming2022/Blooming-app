import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import RecentActivityList from './RecentActivityList';
import ViewAllActivitiesBtn from './ViewAllActivitiesBtn';

const RecentActivityField = ({prevSuccessMisList, setPrevSuccessMisList}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>지난 활동</Text>
        <RecentActivityList
          prevSuccessMisList={prevSuccessMisList}
          setPrevSuccessMisList={setPrevSuccessMisList}></RecentActivityList>
      </View>
      <View style={styles.subContainer}>
        <ViewAllActivitiesBtn></ViewAllActivitiesBtn>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    justifyContent: 'space-around',
  },
  title: {
    flex: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    color: '#242424',
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 14,
  },
  subContainer: {
    marginTop: 2,
    marginBottom: 8,
  },
});

export default RecentActivityField;
