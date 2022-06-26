import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getPrevSuccessMisList} from '../../service/missionServices';
import RecentActivityItem from './components/RecentActivityItem';
import CommonHeader from '../../components/Header/CommonHeader';
import {useNavigation} from '@react-navigation/native';

const PrevSuccessMissionList = () => {
  const navigation = useNavigation();
  const [prevSuccessMisList, setPrevSuccessMisList] = useState([]);

  useEffect(() => {
    getPrevSuccessMisList().then(prevSuccessMisList => setPrevSuccessMisList(prevSuccessMisList));
  }, []);

  return (
    <>
      <CommonHeader navigation={navigation} title="지난 활동 보기" hasArrow={true}></CommonHeader>

      <ScrollView style={styles.container}>
        {prevSuccessMisList.length !== null ? (
          prevSuccessMisList.map((item, index) => (
            <RecentActivityItem activityItem={item} key={index} />
          ))
        ) : (
          <View style={styles.noItem}>
            <Text>당신의 삶을 변화시킬</Text>
            <Text>특별한 미션을 달성해보세요!</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3',
  },
  noItem: {
    width: 353,
    height: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
});

export default PrevSuccessMissionList;
