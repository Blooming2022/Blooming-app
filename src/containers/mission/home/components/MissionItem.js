import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';

const MissionItem = ( { missionNum, title, mission, setMission } ) =>
{
  const [ imageType, setImageType ] = useState(0);
  const num = missionNum;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const imageSource = [
    { image: require( '../../../../assets/images/mission0.png' ) },
    { image: require( '../../../../assets/images/mission1.png' ) },
    { image: require( '../../../../assets/images/mission2.png' ) },
    { image: require( '../../../../assets/images/mission3.png' ) },
    { image: require( '../../../../assets/images/mission0Active.png' ) },
    { image: require( '../../../../assets/images/mission1Active.png' ) },
    { image: require( '../../../../assets/images/mission2Active.png' ) },
    { image: require( '../../../../assets/images/mission3Active.png' ) }
  ];
  const showMenu = () => {
    setIsMenuVisible(true);
  }
  const hideMenu = () => {
    setIsMenuVisible(false);
  }
  useEffect(() =>
  { 
    if (mission) {
      setImageType(num + 4);
    } else {
      setImageType(num);
    }
  }, [mission] )

  return (
    <View style={ styles.container}>
      <View style={styles.mission}>
        <TouchableOpacity onPress={() => {setMission(!mission);}}>
          <Image source={imageSource[imageType].image}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Menu
        style={styles.menu}
        visible={isMenuVisible}
        anchor={<TouchableOpacity onPress={showMenu} style={styles.missionMenu}>
        <Image source={require('../../../../assets/images/missionMenu.png')}></Image>
        </TouchableOpacity>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu} textStyle={styles.menuText}>수정</MenuItem>
        <MenuItem onPress={hideMenu} textStyle={styles.menuText}>삭제</MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 256,
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomColor: '#242424',
    borderBottomWidth:1,
    marginBottom: 16,
    paddingBottom: 3,
    position:'relative'
  },
  mission: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#242424',
    paddingLeft: 16
  },
  missionMenu: {
    paddingHorizontal: 10,
    paddingVertical:10,
  },
  menu: {
    backgroundColor: '#2C2C2C',
    borderRadius:10,
    width: 80,
  },
  menuText: {
    fontSize:14,
    color: '#ffffff',
  }
});

export default MissionItem;
