import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {createPrevSuccessMis} from '../../service/missionServices';
import {getPrevSuccessMisList} from '../../service/missionServices';
import {getCurrentMisList} from '../../service/missionServices';

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
    paddingLeft: 20,
    paddingRight: 20,
  },
  periodButtonOuterContainer: {
    marginVertical: 10,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  periodButtonInnerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 35,
    width: '100%',
    borderColor: '#E0E0E0',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
});

export default Report;
