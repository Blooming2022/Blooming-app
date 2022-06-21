import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { getRandomKeywords } from '../../../service/missionServices';
import RandomKeywordList from './components/RandomKeywordList';

const RandomMissionGenerate = ({route}) => {
  const misInfo = route.params.misInfo;
  const [keywordList, setKeywordList] = useState([]);
  const [selectedList, setSelectedList] = useState([false,false]);

  useEffect(()=>{
    getKeywords();
  }, [])

  const getKeywords = async () => {
    let isSeason = false;
    if(misInfo.misPeriod == 2)
      isSeason = true;
    const result1 = await getRandomKeywords(isSeason);
    const result2 = await getRandomKeywords(isSeason);
    setKeywordList([result1, result2]);
    setSelectedList([false,false]);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>생성된 랜덤 미션입니다!</Text>
        <Text style={styles.subTitle}>원하는 미션을 선택해주세요</Text>
        <TouchableOpacity style={styles.resetBox} onPress={getKeywords}>
          <Text style={styles.resetText}>다시 생성</Text>
          <Image source={require('../../../assets/images/reset.png')}></Image>
        </TouchableOpacity>
        <RandomKeywordList keywordList={keywordList} selectedList={selectedList} setSelectedList={setSelectedList}></RandomKeywordList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    alignItems:'center'
  },
  title: {
    paddingTop: 70,
    paddingBottom: 11,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242424',
  },
  subTitle: {
    paddingBottom: 20,
    fontSize: 16,
    color: '#242424',
    textAlign:'center',
  },
  resetBox:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  resetText: {
    fontSize: 14,
    color: '#242424',
    paddingRight: 10
  }
});
export default RandomMissionGenerate;
