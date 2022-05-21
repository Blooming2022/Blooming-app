import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import MissionItem from './MissionItem';
const MissionList = ({missionList, setMissionList}) => {
  return (
    <ScrollView>
      {missionList.length !== 0 ? (
        missionList.map((item, index) => (
          <MissionItem
            mission={item}
            key={index}
            setMissionList={setMissionList}
            missionList={missionList}
          />
        ))
      ) : (
        <View style={styles.noItem}>
          <Text>당신의 삶을 변화시킬</Text>
          <Text>특별한 미션을 만들어보세요!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 256,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 3,
    position: 'relative',
  },
  noItem: {
    marginTop: 50,
    alignItems: 'center',
  },
  mission: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#242424',
    paddingLeft: 16,
  },
  missionMenu: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menu: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    width: 80,
  },
  menuText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default MissionList;
