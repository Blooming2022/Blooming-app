import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const LevelItem = ({levelNum, levelName, levelStartNum, levelEndNum, welcomeString}) => {
  let imageSource;

  imageSource = [
    {image: require('../../../assets/images/level0.png')},
    {image: require('../../../assets/images/level1.png')},
    {image: require('../../../assets/images/level2.png')},
    {image: require('../../../assets/images/level3.png')},
    {image: require('../../../assets/images/level4.png')},
    {image: require('../../../assets/images/level5.png')},
  ];

  return (
    <View style={styles.levelItem}>
      <Image source={imageSource[levelNum].image} style={styles.icon} resizeMode="contain"></Image>
      <View style={styles.columnContainer}>
        <Text style={styles.period}>레벨 {levelNum}</Text>
        <Text style={styles.title}>{levelName}</Text>
      </View>
      <View style={styles.columnContainer2}>
        {levelStartNum == levelEndNum ? (
          <Text style={styles.explainText}>성공 미션 {levelStartNum}개 이상</Text>
        ) : (
          <Text style={styles.explainText}>
            성공 미션 {levelStartNum} ~ {levelEndNum}개
          </Text>
        )}
        <Text style={styles.welcomeText}>{welcomeString}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  levelItem: {
    width: 353,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    width: 70,
    marginTop: 15,
    marginBottom: 18,
    marginLeft: 9,
  },
  columnContainer2: {
    flexDirection: 'column',
    width: 200,
    marginTop: 15,
    marginBottom: 18,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 15,
  },
  period: {
    fontSize: 12,
    color: '#ABABAB',
    marginLeft: 20,
    marginBottom: 2,
  },
  title: {
    fontSize: 17,
    color: '#242424',
    marginLeft: 20,
  },
  explainText: {
    fontSize: 15,
    height: 20,
    color: '#242424',
    marginLeft: 30,
    marginTop: 5,
    marginHorizontal: 20,
  },
  welcomeText: {
    fontSize: 12,
    color: '#ABABAB',
    marginLeft: 33,
    marginTop: 5,
    marginBottom: 2,
  },
});

export default LevelItem;
