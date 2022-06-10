import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import MisMemoInput from './MisMemoInput';

const MisMemoField = ({setMemo}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.memoIcon} source={require('../../../../assets/images/memo.png')}></Image>
      <MisMemoInput setMemo={setMemo}></MisMemoInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  memoIcon: {
    marginRight: 15,
  },
});

export default MisMemoField;
