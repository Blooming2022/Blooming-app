import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CommonHeader from '../../components/Header/CommonHeader';
import LevelItem from './components/LevelItem';

const Level = () => {
  const navigation = useNavigation();

  return (
    <>
      <CommonHeader navigation={navigation} title="전체 레벨 보기" hasArrow={true}></CommonHeader>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <LevelItem
            levelNum={0}
            levelName={'씨앗'}
            levelStartNum={0}
            levelEndNum={2}
            welcomeString={'이제 막 찾아오셨네요! 반가워요'}
          />
          <LevelItem
            levelNum={1}
            levelName={'새싹'}
            levelStartNum={3}
            levelEndNum={5}
            welcomeString={'새싹을 피워냈어요!'}
          />
          <LevelItem
            levelNum={2}
            levelName={'줄기'}
            levelStartNum={6}
            levelEndNum={9}
            welcomeString={'줄기가 생겼어요!'}
          />
          <LevelItem
            levelNum={3}
            levelName={'가지'}
            levelStartNum={10}
            levelEndNum={14}
            welcomeString={'고생했어요! 나무까지 가 볼까요?'}
          />
          <LevelItem
            levelNum={4}
            levelName={'나무'}
            levelStartNum={15}
            levelEndNum={29}
            welcomeString={'한 그루의 나무가 되었어요!'}
          />
          <LevelItem
            levelNum={5}
            levelName={'꽃나무'}
            levelStartNum={30}
            levelEndNum={30}
            welcomeString={'당신은 Blooming 마스터에요!'}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 550,
    width: 353,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 353,
    marginTop: 2,
    marginBottom: 3,
    marginHorizontal: 20,
  },
});

export default Level;
