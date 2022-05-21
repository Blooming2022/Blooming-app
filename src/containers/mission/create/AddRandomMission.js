import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

//초반엔 구역공부하고 스타일 지정하는 연습할 때 사용한 랜덤페이지, 완성되지 않았기 때문에 랜덤미션 생성 페이지로 연결되는 네비게이션은 없으나, 새로 파일 만들면 번거로우니 그대로 유지하는 중.
const AddRandomMission = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text>
      </View>
      <View style={styles.title}>
        <Text>랜덤미션 추가하기</Text>
      </View>
      <View style={styles.content}>랜덤미션 디테일 부분</View>
      <View style={styles.footer}>
        <Text>footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
    //alignItems: 'stretch'
  },
  header: {
    width: '100%',
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    //alignItems: 'stretch'
  },
  title: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    //alignItems: 'stretch'
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'green',
    //alignItems: 'stretch'
  },
  footer: {
    width: '100%',
    height: '15%',
    backgroundColor: 'blue',
    //alignItems: 'stretch'
  },
});

export default AddRandomMission;
