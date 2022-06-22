import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import InfoModal from '../../../../components/Modal/InfoModal';

const RandomMisTitle = ({misTitle}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <InfoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="안내"
        text1="랜덤미션은 수정할 수 없습니다."
        text2="해당 키워드가 들어가는 미션에 도전해보세요!"></InfoModal>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.misTitle}>{misTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#242424',
    borderBottomWidth: 2,
    marginTop: 20,
    paddingLeft: 10,
    paddingBottom: 2,
  },
  misTitle: {
    paddingLeft: 5,
    paddingBottom: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#242424',
  },
});

export default RandomMisTitle;
