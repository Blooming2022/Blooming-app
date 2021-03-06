import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const DeleteHeader = ({navigation, setIsDelModalVisible}) => {
  const showDeleteModal = () => {
    setIsDelModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../assets/images/backBtn.png')}
          style={styles.headerButtonImage}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showDeleteModal}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../assets/images/trashbin.png')}></Image>
      </TouchableOpacity>
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
    width: 22,
    height: 22,
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

export default DeleteHeader;
