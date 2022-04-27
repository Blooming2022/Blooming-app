import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MissionAddModal from '../../../../components/Modal/MissionAddModal';

const MissionWeekFlower = ( { mis0, mis1, mis2, mis3 } ) =>
{
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  }
  return (
    <View style={styles.container}>
      <MissionAddModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></MissionAddModal>
      <View style={ styles.petal1 }>
        { mis0?
          <Image source={require( '../../../../assets/images/week0Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn1]} onPress={showModal} >
              <Image source={require('../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require( '../../../../assets/images/week0.png')}></Image>
          </>
        }
      </View>
      <View style={styles.petal2}>
        { mis1?
          <Image source={require( '../../../../assets/images/week1Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn2]} onPress={showModal}>
              <Image source={require( '../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require( '../../../../assets/images/week1.png')} ></Image>
          </>
        }
      </View>
      <View style={styles.petal3}>
       { mis2?
          <Image source={require('../../../../assets/images/week2Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn3]} onPress={showModal} >
              <Image source={require( '../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require( '../../../../assets/images/week2.png')}></Image>
          </>
        }
      </View>
      <View style={styles.petal4}>
        { mis3?
          <Image source={require('../../../../assets/images/week3Active.png')}></Image> :
          <>
            <TouchableOpacity style={[styles.plusBtn, styles.btn4]} onPress={showModal} >
              <Image source={require( '../../../../assets/images/plusButton.png')}></Image>
            </TouchableOpacity>
            <Image source={require('../../../../assets/images/week3.png')}></Image>
          </>
        }
      </View>

      <Image source={require('../../../../assets/images/weekCenter.png')} style={styles.weekCenter}></Image>
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
  petal1: {
    position: 'absolute',
    top: 10,
    left: 90,
  },
  petal2: {
    position: 'absolute',
    top: 100,
    left: 20,
  },
  petal3: {
    position: 'absolute',
    top: 170,
    left: 110
  },
  petal4: {
    position: 'absolute',
    top: 80,
    right:20,
  },
  weekCenter: {
    position: 'absolute',
    top: 140,
    left: 155,
    zIndex:10
  },
  plusBtn: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    // backgroundColor: 'pink',
  },
  btn1: {
    position: 'absolute',
    top: 25,
    left:30,
    zIndex:10
  },
  btn2: {
    position: 'absolute',
    top: 38,
    left:25,
    zIndex:10
  },
  btn3: {
    position: 'absolute',
    top: 50,
    left:30,
    zIndex:10
  },
  btn4: {
    position: 'absolute',
    top: 40,
    left:40,
    zIndex:10
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
