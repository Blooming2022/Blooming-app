import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const MissionWeekFlower = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={ require( '../../../../assets/images/week1.png' ) } style={styles.week1}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={ require( '../../../../assets/images/week2.png' ) } style={styles.week2}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={ require( '../../../../assets/images/week3.png' ) } style={styles.week3}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={ require( '../../../../assets/images/week4.png' ) } style={styles.week4}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../../../../assets/images/weekCenter.png')} style={styles.weekCenter}></Image>
      </TouchableOpacity>
      <View style={styles.countBox}>
        <Text style={styles.count}>랜덤: 0/2</Text>
        <Text style={styles.count}>셀프: 0/2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    position: 'relative',
    width: 350,
    height: 350,
  },
  week1: {
    position: 'absolute',
    top: 10,
    left: 80
  },
  week2: {
    position: 'absolute',
    top: 90,
    left: 10
  },
  week3: {
    position: 'absolute',
    top: 150,
    left: 80
  },
  week4: {
    position: 'absolute',
    top: 70,
    left: 150
  },
  weekCenter: {
    position: 'absolute',
    top: 150,
    left: 160
  },
  countBox: {
    position: 'absolute',
    top: 255,
    right: 30,
  },
  count: {
    fontSize: 14,
    color: '#999999'
  }
});

export default MissionWeekFlower;
