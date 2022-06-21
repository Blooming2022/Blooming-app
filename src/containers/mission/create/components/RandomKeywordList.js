import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const RandomKeywordItem = ({item, index, selectedList, setSelectedList}) => {
  const checkFunction = () => {
    const newSelectedList = [false, false];
    let oldValue = selectedList[index];
    newSelectedList[index] = !oldValue;
    setSelectedList(newSelectedList);
  }

  return(
    <View style={styles.itemBox}>
      <TouchableOpacity onPress={checkFunction} style={styles.checkBox}>
        {selectedList[index]?
        <Image source={require('../../../../assets/images/randomKeywordCheckBoxActive.png')}></Image>:
        <Image source={require('../../../../assets/images/randomKeywordCheckBox.png')}></Image>}
      </TouchableOpacity>
      <Text style={[styles.itemText, selectedList[index]&&styles.selectedItem ]}>{item.result1} / {item.result2}</Text>
    </View>
  )
}

const RandomKeywordList = ({keywordList, selectedList, setSelectedList}) => {
  return (
    <View style={styles.container}>
      {keywordList.map((item, index)=><RandomKeywordItem item={item} key={index} index={index} selectedList={selectedList} setSelectedList={setSelectedList}></RandomKeywordItem>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  itemBox: {
    flexDirection: 'row',
    paddingBottom: 40,
    alignItems:'flex-start'
  },
  checkBox: {
    paddingTop: 5
  },
  itemText: {
    fontSize: 22,
    color:'#979797',
    paddingLeft: 15,
    width: 215,
    flexWrap: 'wrap',
  },
  selectedItem: {
    fontWeight: 'bold',
    color: '#8652FF'
  }
});
export default RandomKeywordList;
