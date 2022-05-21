import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Review = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Initial Review</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MissionStackNavigator', {
            screen: 'addSelfMission',
          })
        }>
        <Text>미션 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Review;
