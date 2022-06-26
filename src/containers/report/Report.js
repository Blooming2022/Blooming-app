import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {getLatestPrevSuccessMis} from '../../service/missionServices';

import ChartWeek from './components/ChartWeek';
import ChartMonth from './components/ChartMonth';
import ChartYear from './components/ChartYear';
import RecentActivityField from './components/RecentActivityField';
import YourLevelField from './components/YourLevelField';
import ReportPeriodSelectBtn from './components/ReportPeriodSelectionBtn';

const Report = () => {
  const [reportPeriod, setReportPeriod] = useState(0);
  const [prevSuccessMisList, setPrevSuccessMisList] = useState([]); // this is latest prevSuccessMisList

  const dummy = [
    {
      misID: 'cPkZLuaHMYvBua5p2Kzz',
      misTitle: '바다보러 가기',
      misPeriod: 1,
      isSuccess: true,
      misSuccessDate: 1655952358099,
      isMisSelf: true,
      misMemo: '바다는 역시 동해바다지!',
      hasReview: false,
    },
    {
      misID: 'cPkZLuaHMYvBua1p2Kzz',
      misTitle: '부모님 안마해드리기',
      misPeriod: 0,
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
      // await getLatestPrevSuccessMis().then(prevMisList => setPrevSuccessMisList(prevMisList));
      setPrevSuccessMisList(dummy);
      console.log(prevSuccessMisList);
    };
    getList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.periodButtonOuterContainer}>
          <View style={styles.periodButtonInnerContainer}>
            <ReportPeriodSelectBtn
              buttontext={'주'}
              selectedId={0}
              reportPeriod={reportPeriod}
              setReportPeriod={setReportPeriod}></ReportPeriodSelectBtn>
            <ReportPeriodSelectBtn
              buttontext={'월'}
              selectedId={1}
              reportPeriod={reportPeriod}
              setReportPeriod={setReportPeriod}></ReportPeriodSelectBtn>
            <ReportPeriodSelectBtn
              buttontext={'년'}
              selectedId={2}
              reportPeriod={reportPeriod}
              setReportPeriod={setReportPeriod}></ReportPeriodSelectBtn>
          </View>
        </View>
        {reportPeriod == 0 && <ChartWeek />}
        {reportPeriod == 1 && <ChartMonth />}
        {reportPeriod == 2 && <ChartYear />}
        <RecentActivityField prevSuccessMisList={prevSuccessMisList}></RecentActivityField>
        <YourLevelField />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  periodButtonOuterContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  periodButtonInnerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 35,
    borderColor: '#E0E0E0',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
});

export default Report;
