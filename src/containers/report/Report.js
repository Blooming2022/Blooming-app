import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {getPrevSuccessMisList} from '../../service/missionServices';

import ChartWeek from './components/ChartWeek';
import ChartMonth from './components/ChartMonth';
import ChartYear from './components/ChartYear';
import RecentActivityField from './components/RecentActivityField';
import YourLevelField from './components/YourLevelField';
import ReportPeriodSelectBtn from './components/ReportPeriodSelectionBtn';

const Report = () => {
  const [reportPeriod, setReportPeriod] = useState(0);
  const [prevSuccessMisList, setPrevSuccessMisList] = useState([]);

  useEffect(() => {
    getPrevSuccessMisList().then(prevSuccessMisList => setPrevSuccessMisList(prevSuccessMisList));
  }, [prevSuccessMisList]);

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

        <RecentActivityField
          prevSuccessMisList={prevSuccessMisList}
          setPrevSuccessMisList={setPrevSuccessMisList}></RecentActivityField>
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
