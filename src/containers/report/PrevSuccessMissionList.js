import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getPrevSuccessMisList} from '../../service/missionServices';
import RecentActivityItem from './components/RecentActivityItem';
import CommonHeader from '../../components/Header/CommonHeader';
import {useNavigation} from '@react-navigation/native';

const PrevSuccessMissionList = () => {
  const navigation = useNavigation();
  const [prevSuccessMisList, setPrevSuccessMisList] = useState([]);
  const dummy = [
    {
      misID: 'cPkZLuaHMYvBua5p2Kzz',
      misTitle: '예시1',
      misPeriod: 0,
      isSuccess: true,
      misSuccessDate: 1655952358099,
      isMisSelf: true,
      misMemo: 'exaplllllefa',
      hasReview: false,
    },
    {
      misID: 'cPkZLuaHMYvBua1p2Kzz',
      misTitle: '예시1',
      misPeriod: 1,
      isSuccess: true,
      misSuccessDate: 1655952358099,
      isMisSelf: true,
      misMemo: 'exaplllllefa',
      hasReview: false,
    },
    {
      misID: 'cPkZLuaH8YvBua5p2Kzz',
      misTitle: '예시1',
      misPeriod: 2,
      isSuccess: true,
      misSuccessDate: 1655952358099,
      isMisSelf: true,
      misMemo: 'exaplllllefa',
      hasReview: false,
    },
  ];
  useEffect(() => {
    const getList = async () => {
      // await getPrevSuccessMisList().then(prevSuccessMisList => setPrevSuccessMisList(prevSuccessMisList));
      setPrevSuccessMisList(dummy);
      console.log(prevSuccessMisList);
    };
    getList();
  }, []);

  return (
    <>
      <CommonHeader navigation={navigation} title="지난 활동 보기" hasArrow={true}></CommonHeader>
      {prevSuccessMisList.length !== 0 ? (
        <ScrollView style={styles.container}>
          {prevSuccessMisList.map((item, index) => (
            <RecentActivityItem activityItem={item} key={index} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noItem}>
          <Text style={styles.noItemText}>아직 기간이 지난 미션이</Text>
          <Text style={styles.noItemText}>없습니다</Text>
        </View>
      )}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#999999',
  },
});

export default PrevSuccessMissionList;
