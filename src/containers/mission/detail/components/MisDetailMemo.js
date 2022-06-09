import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const MisDetailMemo = ({misMemo}) => {
  return (
    <>
      <View style={styles.memoBox}>
        <Image
          style={styles.memoIcon}
          source={require('../../../../assets/images/memo.png')}></Image>
        <Text style={styles.memoText}>{misMemo}</Text>
      </View>
      <View style={styles.separator}></View>
    </>
  );
};

const styles = StyleSheet.create({
  memoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  memoIcon: {
    marginRight: 15,
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#C5C5C7',
    marginBottom: 15,
  },
});

export default MisDetailMemo;
