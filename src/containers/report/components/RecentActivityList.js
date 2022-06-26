import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RecentActivityItem from './RecentActivityItem';

const RecentActivityList = ({prevSuccessMisList}) => {
  return (
    <ScrollView>
      {prevSuccessMisList.length !== 0 ? (
        prevSuccessMisList.map((item, index) => (
          <RecentActivityItem activityItem={item} key={index} />
        ))
      ) : (
        <View style={styles.noItem}>
          <Text style={styles.noItemText}>아직 기간이 지난 미션이</Text>
          <Text style={styles.noItemText}>없습니다</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noItem: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  noItemText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#999999',
  },
});

export default RecentActivityList;
