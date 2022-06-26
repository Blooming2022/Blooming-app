import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RecentActivityItem from './RecentActivityItem';

const RecentActivityList = ({prevSuccessMisList, setPrevSuccessMisList}) => {
  return (
    <ScrollView>
      {prevSuccessMisList.length !== 0 ? (
        prevSuccessMisList.map((item, index) => (
          <RecentActivityItem activityItem={item} key={index} />
        ))
      ) : (
        <View style={styles.noItem}>
          <Text>당신의 삶을 변화시킬</Text>
          <Text>특별한 미션을 달성해보세요!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noItem: {
    width: 353,
    height: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 10,
  },
});

export default RecentActivityList;
