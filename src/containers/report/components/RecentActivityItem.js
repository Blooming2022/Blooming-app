import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../../service/commonServices';

const RecentActivityItem = ({activityItem}) => {
  let imageSource;
  let missionPeriod;
  const navigation = useNavigation();
  const successDate = formatDate(activityItem.misSuccessDate);

  if (activityItem.misPeriod == 0) {
    missionPeriod = '한주미션';
  } else if (activityItem.period == 1) {
    missionPeriod = '한달미션';
  } else {
    missionPeriod = '계절미션';
  }

  imageSource = [
    {image: require('../../../assets/images/weekFlower.png')},
    {image: require('../../../assets/images/monthFlower.png')},
    {image: require('../../../assets/images/seasonTree.png')},
  ];
  const goToMissionDetail = () => {
    navigation.navigate('PrevSuccessMissionDetail', {mission: activityItem});
  };

  return (
    <TouchableOpacity onPress={goToMissionDetail}>
      <View style={styles.container}>
        <View style={styles.activityItem}>
          {activityItem !== null ? (
            <Image style={styles.icon} source={imageSource[activityItem.misPeriod].image}></Image>
          ) : (
            <Image style={styles.icon}></Image>
          )}

          <View style={styles.columnContainer}>
            <Text style={styles.period}>{missionPeriod}</Text>
            <Text style={styles.title}>{activityItem.misTitle}</Text>
          </View>
          <Text style={styles.successDate}>{successDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    width: 90,
    marginLeft: 9,
    marginTop: 15,
    marginBottom: 18,
  },
  activityItem: {
    display: 'flex',
    width: 353,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 1,
  },
  period: {
    fontSize: 12,
    color: '#ABABAB',
    marginLeft: 20,
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: '#242424',
    marginLeft: 20,
  },
  successDate: {
    fontSize: 12,
    color: '#ABABAB',
    marginLeft: 120,
    marginTop: 30,
  },
});

export default RecentActivityItem;
