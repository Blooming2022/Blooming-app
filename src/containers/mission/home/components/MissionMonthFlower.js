import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MissionAddModal from '../../../../components/Modal/MissionAddModal';

const MissionMonthFlower = ( { mis0, mis1 } ) =>
{
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  }
  return (
    <View style={styles.container}>
      <MissionAddModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></MissionAddModal>
      <View style={styles.petal0}>
        { mis0?
          <Image source={require( '../../../../assets/images/month0Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn0]} onPress={showModal} >
              <Image source={require('../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require( '../../../../assets/images/month0.png')}></Image>
          </>
        }
      </View>
      <View style={styles.petal1}>
        { mis1?
          <Image source={require( '../../../../assets/images/month1Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn1]} onPress={showModal}>
              <Image source={require( '../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require( '../../../../assets/images/month1.png')} ></Image>
          </>
        }
      </View>
      <View style={styles.countBox}>
        <Text style={styles.count}>랜덤: 0/1</Text>
        <Text style={styles.count}>셀프: 0/1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    position: 'relative',
    width: 280,
    height: 280,
    // backgroundColor:'olive'
  },
  petal0: {
    position: 'absolute',
    top: 75,
    left: -25,
    zIndex:5
  },
  petal1: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  plusBtn: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  btn0: {
    position: 'absolute',
    top: 40,
    left: 80,
    zIndex:10,
    // backgroundColor: 'pink',
  },
  btn1: {
    position: 'absolute',
    top: 25,
    left: 120,
    zIndex:10,
    // backgroundColor: 'pink',
  },
  countBox: {
    position: 'absolute',
    top: 200,
    right: 0,
  },
  count: {
    fontSize: 14,
    color: '#999999'
  }
});

export default MissionMonthFlower;
