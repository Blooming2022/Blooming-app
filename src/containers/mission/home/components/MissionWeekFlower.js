import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import MissionAddModal from '../../../../components/Modal/MissionAddModal';
import MissionCount from './MissionCount';

const MissionWeekFlower = ({
  missionList,
  setMissionList,
  picture,
  setPicture,
}) => {
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
        missionList={missionList}
        picture={picture}
        setPicture={setPicture}></MissionAddModal>
      <View style={styles.petal0}>
        {!!picture[0] ? (
          <Image
            source={require('../../../../assets/images/week0Active.png')}></Image>
        ) : (
          <>
            {picture[0] == null ? (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn0]}
                onPress={() => showModal(0)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            ) : null}
            <Image
              source={require('../../../../assets/images/week0.png')}></Image>
          </>
        )}
      </View>
      <View style={styles.petal1}>
        {!!picture[1] ? (
          <Image
            source={require('../../../../assets/images/week1Active.png')}></Image>
        ) : (
          <>
            {picture[1] == null ? (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn1]}
                onPress={() => showModal(1)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            ) : null}
            <Image
              source={require('../../../../assets/images/week1.png')}></Image>
          </>
        )}
      </View>
      <View style={styles.petal2}>
        {!!picture[2] ? (
          <Image
            source={require('../../../../assets/images/week2Active.png')}></Image>
        ) : (
          <>
            {picture[2] == null ? (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn2]}
                onPress={() => showModal(2)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            ) : null}
            <Image
              source={require('../../../../assets/images/week2.png')}></Image>
          </>
        )}
      </View>
      <View style={styles.petal3}>
        {!!picture[3] ? (
          <Image
            source={require('../../../../assets/images/week3Active.png')}></Image>
        ) : (
          <>
            {picture[3] == null ? (
              <TouchableOpacity
                style={[styles.plusBtn, styles.btn3]}
                onPress={() => showModal(3)}>
                <Image
                  source={require('../../../../assets/images/plusButton.png')}></Image>
              </TouchableOpacity>
            ) : null}
            <Image
              source={require('../../../../assets/images/week3.png')}></Image>
          </>
        )}
      </View>
      <Image
        source={require('../../../../assets/images/weekCenter.png')}
        style={styles.weekCenter}></Image>
      <MissionCount
        currentSelf={0}
        maxSelf={2}
        currentRandom={0}
        maxRandom={2}></MissionCount>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 280,
    height: 280,
  },
  petal0: {
    position: 'absolute',
    top: 10,
    left: 80,
  },
  petal1: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 5,
  },
  petal2: {
    position: 'absolute',
    top: 130,
    left: 85,
  },
  petal3: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 5,
  },
  weekCenter: {
    position: 'absolute',
    top: 100,
    left: 120,
    zIndex: 10,
  },
  plusBtn: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  btn0: {
    position: 'absolute',
    top: 10,
    left: 22,
    zIndex: 10,
  },
  btn1: {
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 10,
  },
  btn2: {
    position: 'absolute',
    top: 36,
    left: 25,
    zIndex: 10,
  },
  btn3: {
    position: 'absolute',
    top: 28,
    left: 35,
    zIndex: 10,
  },
});

export default MissionWeekFlower;
