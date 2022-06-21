import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CommonHeader from '../../components/Header/CommonHeader';
import SettingsItem from './components/SettingsItem';

const Settings = () => {
  const [isGuest, setIsGuest] = useState(true);
  const loginInfo = isGuest ? '게스트 로그인' : '소셜 로그인';
  const versionInfo = '1.01 ver';

  return (
    <>
      <CommonHeader title="설정"></CommonHeader>
      <View style={styles.container}>
        <View style={styles.box}>
          <SettingsItem
            title="내 정보"
            text={loginInfo}
            hasImage={false}
            touchable={false}
            isLast={false}></SettingsItem>
          <SettingsItem
            title="버젼 정보"
            text={versionInfo}
            hasImage={false}
            touchable={false}
            isLast={false}></SettingsItem>
          {isGuest && (
            <SettingsItem
              title="연동하기"
              hasImage={true}
              touchable={false}
              isLast={false}></SettingsItem>
          )}
          <SettingsItem
            title="이용약관 및 개인정보 취급 방침"
            hasImage={true}
            touchable={false}
            isLast={false}></SettingsItem>
          {!isGuest && (
            <SettingsItem
              title="로그아웃"
              hasImage={false}
              touchable={true}
              isLast={false}></SettingsItem>
          )}
          <SettingsItem
            title="계정 삭제"
            hasImage={false}
            touchable={true}
            isLast={true}></SettingsItem>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
});

export default Settings;
