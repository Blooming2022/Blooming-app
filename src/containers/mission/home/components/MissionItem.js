import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import {deleteCurrentMis, updateCurrentMis} from '../../../../service/missionServices';
import {useNavigation} from '@react-navigation/native';
import { getKSTTime } from '../../../../service/commonServices';

const MissionItem = ({mission, setMissionList, missionList}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  let imageSource;
  let addNum;
  const navigation = useNavigation();

  if (mission.misPeriod == 0) {
    imageSource = [
      {image: require('../../../../assets/images/missionPink.png')},
      {image: require('../../../../assets/images/missionBlue.png')},
      {image: require('../../../../assets/images/missionYellow.png')},
      {image: require('../../../../assets/images/missionViolet.png')},
      {image: require('../../../../assets/images/missionPinkActive.png')},
      {image: require('../../../../assets/images/missionBlueActive.png')},
      {image: require('../../../../assets/images/missionYellowActive.png')},
      {image: require('../../../../assets/images/missionVioletActive.png')},
    ];
    addNum = 4;
  } else if (mission.misPeriod == 1) {
    imageSource = [
      {image: require('../../../../assets/images/missionPink.png')},
      {image: require('../../../../assets/images/missionViolet.png')},
      {image: require('../../../../assets/images/missionPinkActive.png')},
      {image: require('../../../../assets/images/missionVioletActive.png')},
    ];
    addNum = 2;
  } else {
    imageSource = [
      {image: require('../../../../assets/images/missionViolet.png')},
      {image: require('../../../../assets/images/missionPink.png')},
      {image: require('../../../../assets/images/missionVioletActive.png')},
      {image: require('../../../../assets/images/missionPinkActive.png')},
    ];
    addNum = 2;
  }

  const showMenu = () => {
    setIsMenuVisible(true);
  };
  const hideMenu = () => {
    setIsMenuVisible(false);
  };
  const updateMission = () => {
    setIsMenuVisible(false);
  };
  const deleteMission = () => {
    setIsMenuVisible(false);
    const delMisInfo = {
      misID: mission.id,
      hasReview: mission.hasReview,
    };
    deleteCurrentMis(delMisInfo);
  };
  const goToMissionDetail = () => {
    navigation.navigate('MissionDetail', {mission: mission});
  };
  const checkMission = () => {
    const updateMisInfo = {
      misID: mission.id,
      updateInfo: {
        isSuccess: !mission.isSuccess,
        successDate: getKSTTime()
      }
    };
    updateCurrentMis(updateMisInfo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mission}>
        <TouchableOpacity onPress={checkMission}>
          {mission.isSuccess ? (
            <Image source={imageSource[mission.picNum + addNum].image}></Image>
          ) : (
            <Image source={imageSource[mission.picNum].image}></Image>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={goToMissionDetail}>
          <Text style={styles.title}>{mission.misTitle}</Text>
        </TouchableOpacity>
      </View>
      <Menu
        style={styles.menu}
        visible={isMenuVisible}
        anchor={
          <TouchableOpacity onPress={showMenu} style={styles.missionMenu}>
            <Image source={require('../../../../assets/images/missionMenu.png')}></Image>
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        <MenuItem onPress={updateMission} textStyle={styles.menuText}>
          수정
        </MenuItem>
        <MenuItem onPress={deleteMission} textStyle={styles.menuText}>
          삭제
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 256,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 3,
    position: 'relative',
  },
  mission: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#242424',
    paddingLeft: 16,
  },
  missionMenu: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menu: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    width: 80,
  },
  menuText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default MissionItem;
