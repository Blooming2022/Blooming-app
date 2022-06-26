import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import ViewAllLevelsBtn from './ViewAllLevelsBtn';
import {getUserProfile} from '../../../service/authServices';
import useMissionChanged from '../../../context/hook/useMissionChanged';

const YourLevelField = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  // Just for testing
  // const dummy = {
  //   level: 1,
  //   successNum: 7,
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(0);
  const level = [
    {name: '씨앗', num: 0, image: require('../../../assets/images/level0.png')},
    {name: '새싹', num: 3, image: require('../../../assets/images/level1.png')},
    {name: '줄기', num: 6, image: require('../../../assets/images/level2.png')},
    {name: '가지', num: 10, image: require('../../../assets/images/level3.png')},
    {name: '꽃봉오리', num: 15, image: require('../../../assets/images/level4.png')},
    {name: '꽃나무', num: 30, image: require('../../../assets/images/level5.png')},
  ];
  const {isMissionChanged} = useMissionChanged();
  const calculateProgressBar = () => {
    const size = 320 * (userInfo.successNum / level[userInfo.level + 1].num);
    setSize(size);
  };  
  const getUserInfo = () => {
    getUserProfile().then(result => setUserInfo(result));
  };

  useEffect(() => {
    getUserInfo();
    // setUserInfo(dummy); // Just for testing
  }, [isMissionChanged]);

  useEffect(() => {
    if (userInfo !== undefined) {
      setIsLoading(true);
      calculateProgressBar();
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.subContainer}>
          <Text style={styles.title}>당신의 레벨</Text>
          <View style={styles.levelContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.levelTitle}>{level[userInfo.level].name}</Text>
                <Text style={styles.percentTitle}>{userInfo.successNum}개</Text>
              </View>
              <Image style={styles.icon} source={level[userInfo.level].image}></Image>
            </View>
            <View style={styles.levelbar} />
            <View style={[{width: size}, styles.progressBar]} />
            {userInfo.level === 5 ? (
              <Text style={styles.infoText}>꽃나무를 피웠어요! 당신은 블루밍 마스터에요!</Text>
            ) : (
              <Text style={styles.infoText}>
                {level[userInfo.level + 1].name}에 도달하기 위해 {level[userInfo.level+1].num - userInfo.successNum}개의 미션이 남았어요!
              </Text>
            )}
          </View>
        </View>
      )}
      <View style={styles.subContainer}>
        <ViewAllLevelsBtn></ViewAllLevelsBtn>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  subContainer: {
    marginTop: 10,
    marginBottom: 8,
  },
  columnContainer: {
    width: 200,
    height: 130,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: '#242424',
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 14,
  },
  levelContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#242424',
    marginTop: 20,
    marginBottom: 10,
  },
  percentTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#242424',
    marginBottom: 14,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1.7,
    borderColor: '#E0E0E0',
    marginLeft: 30,
    marginVertical: 20,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#B797FF',
    borderRadius: 50,
    bottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#242424',
    marginLeft: 12,
    marginVertical: 8,
  },
  levelbar: {
    width: 320,
    height: 12,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
});

export default YourLevelField;
