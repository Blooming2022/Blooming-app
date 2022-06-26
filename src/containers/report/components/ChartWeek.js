import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BarChart} from 'react-native-gifted-charts';

const ChartWeek = ({weekSuccessNum, sumOfNum}) => {
  const chartData = [
    {
      value: weekSuccessNum[0],
      label: '월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[0]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[1],
      label: '화',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[1]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[2],
      label: '수',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[2]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[3],
      label: '목',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[3]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[4],
      label: '금',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[4]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[5],
      label: '토',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[5]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: weekSuccessNum[6],
      label: '일',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{weekSuccessNum[6]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 주</Text>
      <Text style={styles.successNum}>{sumOfNum}개 성공</Text>
      <View style={styles.chartField}>
        <BarChart
          height={200}
          noOfSections={4}
          barWidth={15}
          data={chartData}
          yAxisThickness={0.54}
          YAxisColor={'#CACACA'}
          xAxisThickness={1}
          xAxisColor={'#CACACA'}
          initialSpacing={18}
          spacing={23}
          maxValue={4}
          frontColor={'#B797FF'}
          backgroundColor={'#fff'}
        />
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
    paddingTop: 10,
    marginBottom: 20,
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

export default ChartWeek;
