import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';

const DetailHeader = ({navigation, updateFunction, setIsModalVisible, from}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showMenu = () => {
    setIsMenuVisible(true);
  };
  const hideMenu = () => {
    setIsMenuVisible(false);
  };
  useEffect(() => {
    // backButton
    const backButton = () => {
      if(from ==='mission')
        navigation.navigate('MainTab', {screen: 'MissionHome'});
      else if(from ==='review')
        navigation.navigate('MainTab', {screen: 'ReviewHome'});
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButton);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if(from ==='mission')
            navigation.navigate('MainTab', {screen: 'MissionHome'});
          else if(from ==='review')
            navigation.navigate('MainTab', {screen: 'ReviewHome'});
        }}>
        <Image
          source={require('../../assets/images/backBtn.png')}
          style={styles.headerButtonImage}></Image>
      </TouchableOpacity>
      <Menu
        style={styles.menu}
        visible={isMenuVisible}
        anchor={
          <TouchableOpacity style={styles.button} onPress={showMenu}>
            <Image
              style={styles.headerButtonImage}
              source={require('../../assets/images/kebabMenu.png')}></Image>
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        <MenuItem
          onPress={() => {
            hideMenu();
            updateFunction();
          }}
          textStyle={styles.menuText}>
          수정
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu();
            setIsModalVisible(true);
          }}
          textStyle={styles.menuText}>
          삭제
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  headerButtonImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  menu: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    width: 90,
  },
  menuText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default DetailHeader;
