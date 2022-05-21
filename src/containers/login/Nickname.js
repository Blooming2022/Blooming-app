import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import SaveButton from '../../components/Button/SaveButton';
import NicknameInput from './components/NicknameInput';

const Nickname = () => {
  const [isExistName, setIsExistName] = useState(false);
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [nickname, setNickname] = useState('');
  // 임시로 만든 닉네임 중복 검사 함수
  const checkIsExistingNickname = nickname => {
    const list = ['a', '가', '나', '다'];
    return list.includes(nickname);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Image
                style={styles.cancelImage}
                source={require('../../assets/images/x.png')}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>사용하실 닉네임을 입력해주세요.</Text>
          <NicknameInput
            nickname={nickname}
            setNickname={setNickname}
            setButtonDisable={setButtonDisable}
            isExistName={isExistName}
            setIsExistName={setIsExistName}></NicknameInput>
        </ScrollView>
      </TouchableWithoutFeedback>
      <SaveButton
        title="확인"
        value={nickname}
        setValueIsNotValid={setIsExistName}
        checkFunction={checkIsExistingNickname}
        buttonDisabled={buttonDisabled}
        setButtonDisable={setButtonDisable}
        // navigation={navigation}
      ></SaveButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 50,
  },
  cancelImage: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    color: '#242424',
    marginBottom: 50,
    fontWeight: 'bold',
  },
});

export default Nickname;
