import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {BarChart} from 'react-native-gifted-charts';
import {getNumOfSuccessMis} from '../../../service/reportServices';

const ChartMonth = () => {
  let monthSuccessNum = [];

  useEffect(() => {
    const func = async () => {
      monthSuccessNum = await getNumOfSuccessMis(1);
    };
    func();
  }, []);

  monthSuccessNum = [0, 1, 3, 4, 2];

  const SumOfMonthSuccessNum = monthSuccessNum.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  const chartData = [
    {
      value: monthSuccessNum[0],
      label: '1주',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{monthSuccessNum[0]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: monthSuccessNum[1],
      label: '2주',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{monthSuccessNum[1]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: monthSuccessNum[2],
      label: '3주',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{monthSuccessNum[2]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: monthSuccessNum[3],
      label: '4주',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{monthSuccessNum[3]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: monthSuccessNum[4],
      label: '5주',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{monthSuccessNum[4]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 달</Text>
      <Text style={styles.successNum}>{SumOfMonthSuccessNum}개 성공</Text>
      <View style={styles.chartField}>
        <ScrollView horizontal={true} persistentScrollbar={true}>
          <BarChart
            // hideRules //점선의 유부
            height={200}
            noOfSections={6}
            barWidth={15}
            data={chartData}
            yAxisThickness={0.54}
            YAxisColor={'#CACACA'}
            xAxisThickness={1}
            xAxisColor={'#CACACA'}
            initialSpacing={18}
            spacing={35}
            maxValue={6}
            frontColor={'#B797FF'}
            backgroundColor={'#fff'}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarLabel: {color: '#ABABAB', fontSize: 12, marginBottom: 0},
  container: {
    backgroundColor: '#fff',
    height: 350,
    width: 353,
    justifyContent: 'space-around',
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 5,
    paddingTop: 10,
  },
  chartField: {
    backgroundColor: '#fff',
    height: 260,
    width: 350,
    justifyContent: 'space-around',
    borderRadius: 16,
    marginTop: 15,
    marginBottom: 7,
  },
  title: {
    justifyContent: 'space-around',
    fontSize: 16,
    color: '#242424',
    marginTop: 10,
    marginLeft: 15,
  },
  successNum: {
    justifyContent: 'space-around',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242424',
    marginTop: 7,
    marginBottom: 15,
    marginLeft: 15,
  },
});

export default ChartMonth;
