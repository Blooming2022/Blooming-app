import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const MyPage = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Initial MyPage</Text>
      <Button
        // test
        onPress={() => {
          navigation.navigate('MyInfo');
        }}
        title="go MyInfo"></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPage;
