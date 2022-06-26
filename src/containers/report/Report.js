import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {getLatestPrevSuccessMis} from '../../service/missionServices';
import {getNumOfSuccessMis} from '../../service/reportServices';
import ChartWeek from './components/ChartWeek';
import ChartMonth from './components/ChartMonth';
import ChartYear from './components/ChartYear';
import RecentActivityField from './components/RecentActivityField';
import YourLevelField from './components/YourLevelField';
import ReportPeriodSelectBtn from './components/ReportPeriodSelectionBtn';
import useMissionChanged from '../../../context/hook/useMissionChanged';

const Report = () => {
  const [prevSuccessMisList, setPrevSuccessMisList] = useState([]); // this is latest prevSuccessMisList
  const [selectedId, setSelectedId] = useState(0);
  const [weekSuccessNum, setWeekSuccessNum] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [monthSuccessNum, setMonthSuccessNum] = useState([0, 0, 0, 0, 0]);
  const [yearSuccessNum, setYearSuccessNum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [sumOfNum0, setSumOfNum0] = useState(0);
  const [sumOfNum1, setSumOfNum1] = useState(0);
  const [sumOfNum2, setSumOfNum2] = useState(0);
  const {isMissionChanged} = useMissionChanged();

  useEffect(() => {
    const getNumOfMiData = async () => {
      const result0 = await getNumOfSuccessMis(0);
      setWeekSuccessNum(result0);
      const result1 = await getNumOfSuccessMis(1);
      setMonthSuccessNum(result1);
      const result2 = await getNumOfSuccessMis(2);
      setYearSuccessNum(result2);
    };
    getNumOfMiData();
  }, [isMissionChanged]);

  useEffect(() => {
    let sum0 = 0;
    let sum1 = 0;
    let sum2 = 0;
    weekSuccessNum.forEach(item => {
      sum0 += item;
    });
    setSumOfNum0(sum0);
    monthSuccessNum.forEach(item => {
      sum1 += item;
    });
    setSumOfNum1(sum1);
    yearSuccessNum.forEach(item => {
      sum2 += item;
    });
    setSumOfNum2(sum2);
  }, [weekSuccessNum, monthSuccessNum, yearSuccessNum]);

  // Just for testing
  const dummy = [
    {
      misID: 'cPkZLuaHMYvBua5p2Kzz',
      misTitle: '바다보러 가기',
      misPeriod: 1,
      isSuccess: true,
      misSuccessDate: 1655922358099,
      isMisSelf: true,
      misMemo: '바다는 역시 동해바다지!',
      hasReview: false,
    },
    {
      misID: 'cPkZLuaHMYvBua1p2Kzz',
      misTitle: '부모님 안마해드리기',
      misPeriod: 0,
      isSuccess: true,
      misSuccessDate: 1655852358099,
      isMisSelf: true,
      misMemo: '효도하자',
      hasReview: false,
    },
    {
      misID: 'cPkZLuaH8YvBua5p2Kzz',
      misTitle: '바다/서핑',
      misPeriod: 2,
      isSuccess: true,
      misSuccessDate: 1655452358099,
      isMisSelf: true,
      misMemo: '',
      hasReview: false,
    },
  ];
  useEffect(() => {
    const getList = async () => {
      await getLatestPrevSuccessMis().then(prevMisList => setPrevSuccessMisList(prevMisList));
      // setPrevSuccessMisList(dummy); // just for testing
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
              id={0}
              selectedId={selectedId}
              setSelectedId={setSelectedId}></ReportPeriodSelectBtn>
            <ReportPeriodSelectBtn
              buttontext={'월'}
              id={1}
              selectedId={selectedId}
              setSelectedId={setSelectedId}></ReportPeriodSelectBtn>
            <ReportPeriodSelectBtn
              buttontext={'년'}
              id={2}
              selectedId={selectedId}
              setSelectedId={setSelectedId}></ReportPeriodSelectBtn>
          </View>
        </View>
        {selectedId == 0 && <ChartWeek weekSuccessNum={weekSuccessNum} sumOfNum={sumOfNum0} />}
        {selectedId == 1 && <ChartMonth monthSuccessNum={monthSuccessNum} sumOfNum={sumOfNum1} />}
        {selectedId == 2 && <ChartYear yearSuccessNum={yearSuccessNum} sumOfNum={sumOfNum2} />}
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
