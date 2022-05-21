import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MissionCount = ({currentSelf, currentRandom, maxSelf, maxRandom}) => {
  return (
    <View style={styles.countBox}>
      <Text style={styles.count}>
        셀프: {currentSelf}/{maxSelf}
      </Text>
      <Text style={styles.count}>
        랜덤: {currentRandom}/{maxRandom}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countBox: {
    position: 'absolute',
    top: 200,
    right: 0,
  },
  count: {
    fontSize: 14,
    color: '#999999',
  },
});

export default MissionCount;
