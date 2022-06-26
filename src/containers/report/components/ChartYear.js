import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BarChart} from 'react-native-gifted-charts';

const ChartYear = ({yearSuccessNum, sumOfNum}) => {
  const chartData = [
    {
      value: yearSuccessNum[0],
      label: '1월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[0]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[1],
      label: '2월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[1]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[2],
      label: '3월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[2]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[3],
      label: '4월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[3]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[4],
      label: '5월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[4]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[5],
      label: '6월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[5]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[6],
      label: '7월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[6]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[7],
      label: '8월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[7]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[8],
      label: '9월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[8]}</Text>,
      labelWidth: 20,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 4,
      },
    },
    {
      value: yearSuccessNum[9],
      label: '10월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[9]}</Text>,
      labelWidth: 26, //10,11,12월만 너비 다르게 함
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 0, //10,11,12월만  다르게 함
      },
    },
    {
      value: yearSuccessNum[10],
      label: '11월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[10]}</Text>,
      labelWidth: 26,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 0,
      },
    },
    {
      value: yearSuccessNum[11],
      label: '12월',
      topLabelComponent: () => <Text style={styles.topBarLabel}>{yearSuccessNum[11]}</Text>,
      labelWidth: 26,
      labelTextStyle: {
        color: '#242424',
        marginHorizontal: 0,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이번 해</Text>
      <Text style={styles.successNum}>{sumOfNum}개 성공</Text>
      <View style={styles.chartField}>
        <BarChart
          height={200}
          noOfSections={6}
          barWidth={15}
          data={chartData}
          yAxisThickness={0.54}
          YAxisColor={'#CACACA'}
          xAxisThickness={1}
          xAxisColor={'#CACACA'}
          initialSpacing={18}
          spacing={23}
          maxValue={24}
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

export default ChartYear;
