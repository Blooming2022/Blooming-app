import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {MenuItem} from 'react-native-material-menu';
import MissionAddModal from '../../../../components/Modal/MissionAddModal';
import MissionCount from './MissionCount';

const MissionSeasonFlower = ({missionList, setMissionList}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [picNum, setPicNum] = useState(0);
  const showModal = num => {
    setPicNum(num);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <MissionAddModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        picNum={picNum}
        setMissionList={setMissionList}
        missionList={missionList}></MissionAddModal>
      <View style={styles.petal0}>
        {missionList.find(item => item.picNum == 0) == undefined ||
        !missionList.find(item => item.picNum == 0).isSuccess ? (
          <>
            {missionList.find(item => item.picNum == 0) == undefined && (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn0]}
                onPress={() => showModal(0)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            )}
            <Image
              source={require('../../../../assets/images/season0.png')}></Image>
          </>
        ) : (
          <Image
            source={require('../../../../assets/images/season0Active.png')}></Image>
        )}
      </View>
      <View style={styles.petal1}>
        {missionList.find(item => item.picNum == 1) == undefined ||
        !missionList.find(item => item.picNum == 1).isSuccess ? (
          <>
            {missionList.find(item => item.picNum == 1) == undefined && (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn1]}
                onPress={() => showModal(1)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            )}
            <Image
              source={require('../../../../assets/images/season1.png')}></Image>
          </>
        ) : (
          <Image
            source={require('../../../../assets/images/season1Active.png')}></Image>
        )}
      </View>
      <MissionCount
        currentSelf={0}
        maxSelf={1}
        currentRandom={0}
        maxRandom={1}></MissionCount>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 280,
    height: 280,
    marginTop: 20,
  },
  petal0: {
    position: 'absolute',
    bottom: 40,
    left: -20,
  },
  petal1: {
    position: 'absolute',
    bottom: 40,
    left: 100,
    zIndex: 5,
  },
  plusBtn: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  btn0: {
    position: 'absolute',
    top: 48,
    left: 42,
    zIndex: 10,
  },
  btn1: {
    position: 'absolute',
    top: 40,
    left: 50,
    zIndex: 10,
  },
});

export default MissionSeasonFlower;
