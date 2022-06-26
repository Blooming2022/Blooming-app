import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {getUserProfile} from '../../../service/authServices';
import ViewAllLevelsBtn from './ViewAllLevelsBtn';

// 이 파일 내부의 주석 처리는 아직 해결되지 않은 -Infinity 해결과정을 위해 시도한 흔적들입니다.
//추후 오류없이 잘 동작한다면 주석 제거 및 코드 통일성을 맞추겠습니다.
const YourLevelField = () => {
  const [currentLevel, setCurrentLevel] = useState('씨앗');
  const [nextLevel, setNextLevel] = useState('새싹');
  const [forNextLevel, setForNextLevel] = useState(0);
  const [successNumOfLevel, setSuccessNumOfLevel] = useState(0);
  const [percentage, setPercentage] = useState(160);

  // 임시 데이터, 왜 잘 못가져오는 지 모르겠습니다.
  const userInfo = {
    level: 1,
    successNum: 3,
  };

  let imageSource;
  let leftNum;
  let percent = 0;

  useEffect(() => {
    async function fetchData() {
      const userProfileData = await getUserProfile();
      userInfo.level = userProfileData.level;
      userInfo.successNum = userProfileData.successNum;
      const successNum = await findMyLevelInfo();
      setSuccessNumOfLevel(successNum);
      percent = await findPercentage();
      setPercentage(percent);
    }
    fetchData();
    // findMyLevelInfo();
    // findPercentage();
  }, []);

  // 두가지 방법 중 뭐가 더 맞을 지 몰라서 임시 주석 처리 해놓았습니다.
  // const userInfo = {
  //   level: userProfileData.level,
  //   successNum: userProfileData.successNum,
  // };

  imageSource = [
    {image: require('../../../assets/images/level0.png')},
    {image: require('../../../assets/images/level1.png')},
    {image: require('../../../assets/images/level2.png')},
    {image: require('../../../assets/images/level3.png')},
    {image: require('../../../assets/images/level4.png')},
    {image: require('../../../assets/images/level5.png')},
  ];

  const findMyLevelInfo = () => {
    if (userInfo.level == 0) {
      setCurrentLevel('씨앗');
      setNextLevel('새싹');
      setSuccessNumOfLevel(3);
    } else if (userInfo.level == 1) {
      setCurrentLevel('새싹');
      setNextLevel('줄기');
      setSuccessNumOfLevel(3);
    } else if (userInfo.level == 2) {
      setCurrentLevel('줄기');
      setNextLevel('가지');
      setSuccessNumOfLevel(4);
    } else if (userInfo.level == 3) {
      setCurrentLevel('가지');
      setNextLevel('꽃봉오리');
      setSuccessNumOfLevel(5);
    } else if (userInfo.level == 4) {
      setCurrentLevel('꽃봉오리');
      setNextLevel('꽃나무');
      setSuccessNumOfLevel(15);
    } else {
      setCurrentLevel('꽃나무');
      setForNextLevel(0);
      setSuccessNumOfLevel(0);
    }
    return successNumOfLevel;
  };

  const findPercentage = async () => {
    if (userInfo.level == 0) {
      setSuccessNumOfLevel(3);
      // console.log('성공할때 필요한 ' + successNumOfLevel);

      leftNum = 3 - userInfo.successNum;
      setForNextLevel(leftNum);
      // console.log('leftNum ' + leftNum);
    } else if (userInfo.level == 1) {
      setSuccessNumOfLevel(3);
      // console.log('성공할때 필요한 ' + successNumOfLevel);

      leftNum = 6 - userInfo.successNum;
      setForNextLevel(leftNum);
      // console.log('leftNum ' + leftNum);
    } else if (userInfo.level == 2) {
      setSuccessNumOfLevel(4);
      // console.log('성공할때 필요한 ' + successNumOfLevel);

      leftNum = 10 - userInfo.successNum;
      setForNextLevel(leftNum);
      // console.log('leftNum ' + leftNum);
    } else if (userInfo.level == 3) {
      setSuccessNumOfLevel(5);
      // console.log('성공할때 필요한 ' + successNumOfLevel);

      leftNum = 15 - userInfo.successNum;
      setForNextLevel(leftNum);
      // console.log('leftNum ' + leftNum);
    } else if (userInfo.level == 4) {
      setSuccessNumOfLevel(15);
      // console.log('성공할때 필요한 ' + successNumOfLevel);

      leftNum = 30 - userInfo.successNum;
      setForNextLevel(leftNum);
      // console.log('leftNum ' + leftNum);
    } else {
      setSuccessNumOfLevel(0);
      // console.log('성공할때 필요한 ' + successNumOfLevel);
    }

    if (userInfo.level == 5) {
      percent = 320;
      setPercentage(percent);
      setPercentage(percentage);

      console.log('percent5 ' + percent);
    } else {
      const result = await UpdatePercentage(successNumOfLevel, leftNum);
      percent = parseInt(result);
      setPercentage(result);
      setPercentage(percent);

      // console.log('percent ' + userInfo.level + ' ' + percent);
    }
    // console.log('유저 성공미션 횟수 ' + userInfo.successNum);
    // console.log('성공할때 필요한 ' + successNumOfLevel);
    // console.log('leftNum ' + leftNum);

    return percent;
  };

  const UpdatePercentage = (successNumOfLevel, leftNum) => {
    return ((successNumOfLevel - leftNum) * 320) / successNumOfLevel;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>당신의 레벨</Text>
        <View style={styles.levelContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.levelTitle}>{currentLevel}</Text>
              <Text style={styles.percentTitle}>{userInfo.successNum}개</Text>
            </View>
            <View style={styles.columnContainer}>
              <Image style={styles.icon} source={imageSource[userInfo.level].image}></Image>
            </View>
          </View>
          <View style={styles.levelbar} />
          <View
            style={{
              width: percent,
              height: 12,
              backgroundColor: '#B797FF',
              borderRadius: 50,
              bottom: 12,
            }}
          />
          {userInfo.level === 5 ? (
            <Text style={styles.infoText}>꽃나무를 피웠어요! 당신은 블루밍 마스터에요!</Text>
          ) : (
            <Text style={styles.infoText}>
              {nextLevel}에 도달하기 위해 {forNextLevel}개의 미션이 남았어요!
            </Text>
          )}
        </View>
      </View>
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
    marginBottom: 18, // 버튼의 밑 공간 확보
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
    width: 336,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    color: '#242424',
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 14,
  },
  levelContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  levelTitle: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#242424',
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  percentTitle: {
    flex: 1,
    justifyContent: 'space-around',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#242424',
    marginLeft: 12,
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
  infoText: {
    flex: 1,
    justifyContent: 'space-around',
    fontSize: 12,
    color: '#242424',
    marginLeft: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  levelbar: {
    width: 320,
    height: 12,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
});

export default YourLevelField;
