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
  } else if (activityItem.misPeriod == 1) {
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
        <Image style={styles.icon} source={imageSource[activityItem.misPeriod].image}></Image>
        <View style={styles.columnContainer}>
          <Text style={styles.period}>{missionPeriod}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {activityItem.misTitle}
          </Text>
        </View>
        <Text style={styles.successDate}>{successDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    width: 200,
    marginHorizontal: 9,
    marginTop: 15,
    marginBottom: 18,
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 1,
  },
  period: {
    fontSize: 12,
    color: '#ABABAB',
    marginBottom: 2,
  },
  title: {
    width: '100%',
    fontSize: 12,
    color: '#242424',
  },
  successDate: {
    fontSize: 12,
    color: '#ABABAB',
    marginTop: 30,
  },
});

export default RecentActivityItem;
