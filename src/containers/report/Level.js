import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import CommonHeader from '../../components/Header/CommonHeader';
import {useNavigation} from '@react-navigation/native';

const Level = () => {
  const navigation = useNavigation();

  return (
    <>
      <CommonHeader navigation={navigation} title="전체 레벨 보기" hasArrow={true}></CommonHeader>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level0.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 0 </Text>
              <Text style={styles.title}>씨앗</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 0 ~ 2개</Text>
              <Text style={styles.welcomeText}>이제 막 찾아오셨네요! 반가워요</Text>
            </View>
          </View>

          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level1.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 1 </Text>
              <Text style={styles.title}>새싹</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 3 ~ 5개</Text>
              <Text style={styles.welcomeText}>새싹을 피워냈어요!</Text>
            </View>
          </View>

          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level2.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 2 </Text>
              <Text style={styles.title}>줄기</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 6 ~ 9개</Text>
              <Text style={styles.welcomeText}>줄기가 생겼어요!</Text>
            </View>
          </View>

          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level3.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 3 </Text>
              <Text style={styles.title}>가지</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 10 ~ 14개</Text>
              <Text style={styles.welcomeText}>고생했어요! 나무까지 가 볼까요?</Text>
            </View>
          </View>

          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level4.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 4 </Text>
              <Text style={styles.title}>나무</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 15 ~ 29개</Text>
              <Text style={styles.welcomeText}>한 그루의 나무가 되었어요!</Text>
            </View>
          </View>

          <View style={styles.levelItem}>
            <Image
              source={require('../../assets/images/level5.png')}
              style={styles.icon}
              resizeMode="contain"></Image>
            <View style={styles.columnContainer}>
              <Text style={styles.period}>레벨 5 </Text>
              <Text style={styles.title}>꽃나무</Text>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.explainText}>성공 미션 30개 이상</Text>
              <Text style={styles.welcomeText}>당신은 Blooming 마스터에요!</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 540,
    width: 353,
  },
  subContainer: {
    // flexDirection: 'column',
    paddingTop: 2,
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'column',
    width: 353,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 3,
    position: 'relative',
    marginHorizontal: 20,
  },
  columnContainer: {
    flexDirection: 'column', // 혹은 'row'
    paddingTop: 15,
    paddingBottom: 18,
    paddingLeft: 9,
  },
  levelItem: {
    display: 'flex',
    width: 353,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  icon: {
    paddingLeft: 1,
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  period: {
    fontSize: 12,
    color: '#ABABAB',
    paddingLeft: 20,
    paddingBottom: 2,
  },
  title: {
    fontSize: 17,
    color: '#242424',
    paddingLeft: 20,
  },
  explainText: {
    fontSize: 15,
    height: 20,
    color: '#242424',
    paddingLeft: 20,
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 12,
    color: '#ABABAB',
    paddingLeft: 40,
    marginTop: 5,
    paddingBottom: 2,
  },
});

export default Level;
